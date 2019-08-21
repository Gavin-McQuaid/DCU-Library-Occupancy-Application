#coding=utf8
from os import listdir
from os.path import isfile, join
import numpy as np
import cv2
import sys
import matplotlib.pyplot as plt
import time
import databaseconfig as cfg
from subprocess import call
import mysql.connector
from common import transform, heat_map_floor
from imutils.object_detection import non_max_suppression
from imutils import paths
import imutils
import math

#Function that detects all the people in a given image
def people_detection(image):
	#Initialise Histogram of oriented gradients descriptor
    hog = cv2.HOGDescriptor()
    #Use people detector for the HOG descriptor
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    image = cv2.imread(image)
    copy = image.copy()
    image = imutils.resize(image, width=min(400, image.shape[1]))
    #Detect people in the image
    (rects, weights) = hog.detectMultiScale(image, winStride=(4, 4),
        padding=(8, 8), scale=1.05)
    #Draw red circles where people have been detected
    for (x, y, w, h) in rects:
        midpoint = ( (x + (x+w))/2 ,(y + (y+h))/2 )
        cv2.circle(image, (int(midpoint[0]),int(midpoint[1])), 25, (0, 0, 255),-1) 
    #Where there are no red circles change the colour of the pixels to yellow
    image[np.where((image != [0,0,255]).all(axis = 2))] = [0,255,255]
    image = cv2.resize(image, (0,0), fx=0.30, fy=0.30) 
    return image

#Generate the textual description for a given heat map image
def generate_description(camera_coordinates, camera_image):
    description = ""
    #Find all the pixels in an image which are in the range of red colours
    RED_MIN = np.array([0, 0, 255], np.uint8)
    RED_MAX = np.array([0, 0, 255], np.uint8)
    dst = cv2.inRange(camera_image, RED_MIN, RED_MAX)
    #Count number of red pixels found
    no_red = cv2.countNonZero(dst)
    if camera_coordinates[1] <= 250:
        description += "Top "
    elif camera_coordinates[1] <= 500:
        description += "Centre "
    else:
        description += "Bottom "
    if camera_coordinates[0] <= 200:
        description += "left: "
    elif camera_coordinates[0] <= 400:
        description += "middle: "
    else:
        description += "right:  "
    #Divide number of red pixels found by area of circle drawn to find number of people in given image
    no_of_people = round(no_red / (math.pi * 25 * 25)*11)
    if no_of_people != 1:
        description += "There are "
    else:
        return description + "There is 1 person in this area.\n\n"
    description = description + str(no_of_people) + " people in this area.\n\n"
    return description

def main():
    conn = mysql.connector.connect(user=cfg.mysql['user'], password=cfg.mysql['password'],
                              host=cfg.mysql['host'],
                              database=cfg.mysql['database'])

  
    i = 0
    while True:
        cursor = conn.cursor()
        cam1_files = [ f for f in listdir("./training_data/conv_2B/conv2B_test6/") if isfile(join("./training_data/conv_2B/conv2B_test6/",f))]
        cam2_files = [ f for f in listdir("./training_data/conv_4A/conv4A_test6/") if isfile(join("./training_data/conv_4A/conv4A_test6/",f))]
        cam3_files = [ f for f in listdir("./training_data/conv_5A/conv5A_test6/") if isfile(join("./training_data/conv_5A/conv5A_test6/",f))]
        cam4_files = [ f for f in listdir("./training_data/conv_6A/conv6A_test6/") if isfile(join("./training_data/conv_6A/conv6A_test6/",f))]
        cam5_files = [ f for f in listdir("./training_data/conv_7A/conv7A_test6/") if isfile(join("./training_data/conv_7A/conv7A_test6/",f))]

        cam1_image = people_detection("./training_data/conv_2B/conv2B_test6/"+cam1_files[i])
        cam2_image = people_detection("./training_data/conv_4A/conv4A_test6/"+cam2_files[i])
        cam3_image = people_detection("./training_data/conv_5A/conv5A_test6/"+cam3_files[i])
        cam4_image = people_detection("./training_data/conv_6A/conv6A_test6/"+cam4_files[i])
        cam5_image = people_detection("./training_data/conv_7A/conv7A_test6/"+cam5_files[i])

        i+= 1
        if i == len(cam1_files) or i == len(cam2_files) or i == len(cam3_files) or i == len(cam4_files) or i == len(cam5_files):
            i = 0
        
        #Basement image and textual description
        basement = heat_map_floor("./images/lib-1.png", [(480,110),(280,315), (420,315)], [cam1_image, cam2_image, cam3_image] ,"Basement",generate_description)
        cursor.execute("""UPDATE text_descriptions SET description=%s WHERE floor=%s""", (basement[1],'Basement'))
        conn.commit()
        cv2.imwrite("./heatmaps/basement.png", basement[0])
        #Ground floor image and textual description
        ground_floor = heat_map_floor("./images/lib0.png", [(140,110),(450,110), (300,180)], [cam2_image, cam5_image, cam1_image],"Ground Floor",generate_description)
        cursor.execute("""UPDATE text_descriptions SET description=%s WHERE floor=%s""", (ground_floor[1],'Ground Floor'))
        conn.commit()
        cv2.imwrite("./heatmaps/ground.png", ground_floor[0])
        #First floor image and textual description
        first_floor = heat_map_floor("./images/lib1.png", [(470,110),(150,110), (310,340)], [cam3_image, cam4_image, cam2_image] ,"First Floor",generate_description)
        cursor.execute("""UPDATE text_descriptions SET description=%s WHERE floor=%s""", (first_floor[1],'First Floor'))
        conn.commit()
        cv2.imwrite("./heatmaps/first.png", first_floor[0])
        #Second floor image and textual description
        second_floor = heat_map_floor("./images/lib2.png", [(450,110),(160,315), (300,315)], [cam1_image, cam5_image, cam4_image] ,"Second Floor",generate_description)
        cursor.execute("""UPDATE text_descriptions SET description=%s WHERE floor=%s""", (second_floor[1],'Second Floor'))
        conn.commit()
        cv2.imwrite("./heatmaps/second.png", second_floor[0])

        #SCP all the images to the server
        #In production the service would run on the server so this step would not be necessary
        #However, due to AWS memory constraints we've been forced to add this step
        cmd = 'scp -i DCULibApp.pem -r ./heatmaps ec2-user@ec2-34-244-240-250.eu-west-1.compute.amazonaws.com:/var/www/html/'
        call(cmd.split())
        #Update images and descriptions once a minute.
        time.sleep(60)
    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()









    

