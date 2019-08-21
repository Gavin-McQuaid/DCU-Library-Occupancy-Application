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

#This function tries to minimise the noise pixels in an image to give a more accurate background subtraction
def denoise(frame):
    frame = cv2.medianBlur(frame,5)
    frame = cv2.GaussianBlur(frame,(5,5),0)
    return frame

#This function trains a background subtractor using images that have no people in them
def train_subtractor(training_data_path):
    pts1 = np.float32([[0,50],[250,200],[100,250]]) 
    pts2 = np.float32([[0,0],[249,150],[80,270]])
    #Initialise the background subtractor
    fgbg = cv2.bgsegm.createBackgroundSubtractorMOG()
    #Get all the files from the training directory provided
    onlyfiles = [ f for f in listdir(training_data_path) if isfile(join(training_data_path,f))]
    #Train subtractor with training files
    for file in onlyfiles:
        bgImageFile = training_data_path+file
        bg = denoise(cv2.imread(bgImageFile))
        bg = transform(bg,pts1,pts2)
        fgmask = fgbg.apply(bg, learningRate=0.5)
    print("Subtractor successfully trained!")
    return fgbg

#This function carries out the background subtraction on an image using a trained background subtractor
def background_subtraction(background_subtractor, image_path):
    pts1 = np.float32([[0,50],[250,200],[100,250]]) #Points for the transformation. Discovered through trial and error
    pts2 = np.float32([[0,0],[249,150],[80,270]]) 
    stillFrame = denoise(cv2.imread(image_path))
    stillFrame = transform(stillFrame, pts1,pts2)
    fgmask = background_subtractor.apply(stillFrame, learningRate=0)
    fgmask = cv2.bitwise_not(fgmask)
    #Add heatmap colouring to picture
    fgmask = cv2.applyColorMap(fgmask, cv2.COLORMAP_AUTUMN)
    fgmask = cv2.resize(fgmask, (0, 0), fx=0.15, fy=0.15)
    return fgmask

#Generate the textual description for a given heat map image
def generate_description(camera_coordinates, camera_image):
    description = ""
    #Find all the pixels in an image which are in the range of red colours
    RED_MIN = np.array([0, 0, 200], np.uint8)
    RED_MAX = np.array([50, 50, 255], np.uint8)
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
    #Divide number of red pixels by total pixels to get area occupied
    percentage = (no_red / camera_image.size) * 100
    percentage_string = "{0:.2f}%".format(percentage)
    description = description + percentage_string + " full. This area is "
    if percentage <= 15:
        description += "quite empty.\n\n"
    elif percentage <= 30:
        description += "moderately full.\n\n"
    else:
        description += "really full.\n\n"
    return description

def main():
    conn = mysql.connector.connect(user=cfg.mysql['user'], password=cfg.mysql['password'],
                              host=cfg.mysql['host'],
                              database=cfg.mysql['database'])

    #Background subtractors for each camera   
    cam1 = train_subtractor("./training_data/conv_2B/conv2B_training_bg/")
    cam2 = train_subtractor("./training_data/conv_4A/conv4A_training_bg/")
    cam3 = train_subtractor("./training_data/conv_5A/conv5A_training_bg/")
    cam4 = train_subtractor("./training_data/conv_6A/conv6A_training_bg/")
    cam5 = train_subtractor("./training_data/conv_7A/conv7A_training_bg/")

    
    i = 0
    while True:
        cursor = conn.cursor()
        cam1_files = [ f for f in listdir("./training_data/conv_2B/conv2B_test6/") if isfile(join("./training_data/conv_2B/conv2B_test6/",f))]
        cam2_files = [ f for f in listdir("./training_data/conv_4A/conv4A_test6/") if isfile(join("./training_data/conv_4A/conv4A_test6/",f))]
        cam3_files = [ f for f in listdir("./training_data/conv_5A/conv5A_test6/") if isfile(join("./training_data/conv_5A/conv5A_test6/",f))]
        cam4_files = [ f for f in listdir("./training_data/conv_6A/conv6A_test6/") if isfile(join("./training_data/conv_6A/conv6A_test6/",f))]
        cam5_files = [ f for f in listdir("./training_data/conv_7A/conv7A_test6/") if isfile(join("./training_data/conv_7A/conv7A_test6/",f))]

        cam1_image = background_subtraction(cam1,"./training_data/conv_2B/conv2B_test6/"+cam1_files[i])
        cam2_image = background_subtraction(cam2,"./training_data/conv_4A/conv4A_test6/"+cam2_files[i])
        cam3_image = background_subtraction(cam3,"./training_data/conv_5A/conv5A_test6/"+cam3_files[i])
        cam4_image = background_subtraction(cam4,"./training_data/conv_6A/conv6A_test6/"+cam4_files[i])
        cam5_image = background_subtraction(cam5,"./training_data/conv_7A/conv7A_test6/"+cam5_files[i])

        i+= 1
        if i == len(cam1_files) or i == len(cam2_files) or i == len(cam3_files) or i == len(cam4_files) or i == len(cam5_files):
            i = 0
        
        #Basement image and textual description
        basement = heat_map_floor("./images/lib-1.png", [(480,110),(280,315), (420,315)], [cam1_image, cam2_image, cam3_image] ,"Basement",generate_description)
        cursor.execute("""UPDATE text_descriptions SET description=%s WHERE floor=%s""", (basement[1],'Basement'))
        conn.commit()
        cv2.imwrite("./heatmaps/basement.png", basement[0])
        #Ground floor image and textual description
        ground_floor = heat_map_floor("./images/lib0.png", [(140,110),(450,110), (300,180)], [cam2_image, cam5_image, cam1_image],"Ground Floor", generate_description)
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









    

