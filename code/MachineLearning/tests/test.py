import unittest, sys, cv2
import numpy as np
sys.path.append('../')
from common import transform, heat_map_floor
from background_subtraction import denoise, train_subtractor, background_subtraction
from background_subtraction import generate_description as bs_gd
from people_detection import people_detection
from people_detection import generate_description as pd_gd
pts1 = np.float32([[0,50],[250,200],[100,250]]) 
pts2 = np.float32([[0,0],[249,150],[80,270]])


class TestTransform(unittest.TestCase):
	#Ensure transform function works as expected
	def test_transform_works(self):
		image = cv2.imread("./images/transformoriginal.png")
		self.assertEqual(type(transform(image, pts1,pts2)), np.ndarray)

	#Ensure heat map function works with generate_description function from background subtraction
	def test_heat_map_floor_bs(self): 
		images = [cv2.imread("./images/transformoriginal.png")]
		coordinates = [(0,0)]
		floor = "./images/transformafter.png"
		self.assertEqual(type(heat_map_floor(floor, coordinates, images, "Basement",bs_gd)[0]),np.ndarray)
		self.assertEqual(type(heat_map_floor(floor, coordinates, images, "Basement", bs_gd)[1]),str)

	#Ensure heat map function works with generate_description function from people detection
	def test_heat_map_floor_pd(self): 
		images = [cv2.imread("./images/transformoriginal.png")]
		coordinates = [(0,0)]
		floor = "./images/transformafter.png"
		self.assertEqual(type(heat_map_floor(floor, coordinates, images, "Basement",pd_gd)[0]),np.ndarray)
		self.assertEqual(type(heat_map_floor(floor, coordinates, images, "Basement", pd_gd)[1]),str)


class TestBackgroundSubtraction(unittest.TestCase):
	#Ensure denoise function works as expected
	def test_denoise_works(self):
		image = cv2.imread("./images/transformoriginal.png")
		self.assertEqual(type(denoise(image)), np.ndarray)

	 #Ensure train subtractor function works
	def test_train_subtractor_works(self):
		self.assertEqual(type(train_subtractor("./images/")), type(cv2.bgsegm.createBackgroundSubtractorMOG()))

	#Ensure background subtraction function works
	def test_background_subtraction(self):
		self.assertEqual(type(background_subtraction(cv2.bgsegm.createBackgroundSubtractorMOG(),"./images/transformoriginal.png"
)),np.ndarray)

	#Ensure generate description function works
	def test_generate_description(self):
		self.assertEqual(type(bs_gd((0,0), cv2.imread("./images/transformoriginal.png"))),str)

	

class TestPeopleDetection(unittest.TestCase):
	#Ensure people detection function works
	def test_people_detection(self):
		self.assertEqual(type(people_detection("./images/transformoriginal.png")),np.ndarray)


	#Ensure generate description function works
	def test_generate_description(self):
		self.assertEqual(type(pd_gd((0,0), cv2.imread("./images/transformoriginal.png"))),str)

	
	
	

if __name__ == "__main__":
	unittest.main()
