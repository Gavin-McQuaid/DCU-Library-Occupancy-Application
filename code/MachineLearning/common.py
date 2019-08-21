import cv2
#This function turns a CCTV view image into a bird's eye view image
def transform(img, pts1, pts2):
    rows,cols,ch = img.shape
    M = cv2.getAffineTransform(pts1,pts2)
    dst = cv2.warpAffine(img,M,(cols,rows))
    return dst

#This function takes a floor plan and maps the heatmaps from the different cameras onto it. It also generates textual descriptions for each area
# covered by a camera on a floor.
def heat_map_floor(image, camera_coordinates, camera_images, description, description_function):
    floor = cv2.imread(image) 
    description = ""
    for i in range(len(camera_coordinates)):
        description += description_function(camera_coordinates[i],camera_images[i])
        # Map the camera heat maps onto the floorplan
        floor_copy = floor.copy()
        floor[camera_coordinates[i][1]:camera_coordinates[i][1]+camera_images[i].shape[0],camera_coordinates[i][0]:camera_coordinates[i][0]+camera_images[i].shape[1]] = camera_images[i]
        cv2.addWeighted(floor_copy, 0.6, floor, 0.4, 0, floor)

    return (floor,description)