#!/usr/bin/env python
import sys
import numpy as np
import random
import math

import DiamondSquare

WALL = 8
FREE = 0

def rotateAboutPoint(origin, point, angle):
  # Get offset from origin
  x = point[0] - origin[0]
  y = point[1] - origin[1]
  # Calculate and store angles
  cos_a, sin_a = math.cos(angle), math.sin(angle)
  # Rotate about the point
  x_prime = x * cos_a - y * sin_a
  y_prime = y * cos_a + x * sin_a
  # Since we transformed the point to calculate, reverse the transform
  return [origin[0] + x_prime, origin[1] + y_prime]
 
def dist(p1, p2):
  dx = p2[0] - p1[0]
  dy = p2[1] - p1[1]
  return math.sqrt(dx*dx + dy*dy)

def smooth_arr(arr):
  result = np.copy(arr)
  for r in range(0, arr.shape[0]):
    for c in range(0, arr.shape[1]):
      
  

class Polygon:
  
  def __init__(self, points):
    self.points = points
  
  def tileInPolygon(self, x, y):
    # return self.pointInPolygon(x, y)
    # Increase threshold for rasterizer
    return self.pointInPolygon(x - 0.5, y) or \
      self.pointInPolygon(x + 0.5, y) or \
      self.pointInPolygon(x, y - 0.5) or \
      self.pointInPolygon(x, y + 0.5)
    
  # Source: http://alienryderflex.com/polygon_fill/
  def pointInPolygon(self, x, y):
    i = len(self.points) - 1
    j = len(self.points) - 1
    oddNodes = False
    polyY = [x[1] for x in self.points]
    polyX = [x[0] for x in self.points]
    for i in range(0, len(self.points)):
      if  ((polyY[i]< y and polyY[j]>=y
      or    polyY[j]< y and polyY[i]>=y)
      and  (polyX[i]<=x and polyX[j]<=x)):
        if (polyX[i]+(y-polyY[i])/(polyY[j]-polyY[i])*(polyX[j]-polyX[i])<x):
          oddNodes = not oddNodes
      j = i
    return oddNodes
    
  
class World:
  
  def __init__(self, x_size, y_size):
    self._data = [[WALL for x in range(x_size)] for x in range(y_size)]
    self.x_size = x_size
    self.y_size = y_size
    
  def setTile(self, x, y, value):
    self._data[y][x] = value
    
  def randomRectangle(self, width, height):
    x = int(random.random() * self.x_size)
    y = int(random.random() * self.y_size)
    angle = random.random() * 3.14 * 2
    
    point1 = [x, y]
    point2 = [x + width, y]
    point3 = [x + width, y + height]
    point4 = [x, y + height]
    
    point2_prime = rotateAboutPoint(point1, point2, angle)
    point3_prime = rotateAboutPoint(point1, point3, angle)
    point4_prime = rotateAboutPoint(point1, point4, angle)
    
    first_triangle = [point1, point2_prime, point3_prime]
    second_triangle = [point1, point3_prime, point4_prime]
    
    return Polygon(first_triangle), Polygon(second_triangle)
    
  def createWorld(self, roomPoly, refillPoly):
    cutPolygons, fillPolygons = [], []
 
    # Create many polygons
    for _ in range(roomPoly):
      width, height = int(random.random() * 5) + 8, int(random.random() * 5) + 8
      tri1, tri2 = self.randomRectangle(width, height)
      cutPolygons.append(tri1)
      cutPolygons.append(tri2)
      
    for _ in range(refillPoly):
      width, height = int(random.random() * 5) + 5, int(random.random() * 5) + 5
      tri1, tri2 = self.randomRectangle(width, height)
      fillPolygons.append(tri1)
      fillPolygons.append(tri2) 
    
    # Fill in the polygons, very slowly
    for x in range(0, self.x_size):
      for y in range(0, self.y_size):
        for polygon in cutPolygons:
          if polygon.tileInPolygon(x, y):
            self.setTile(x, y, FREE)
        for polygon in fillPolygons:
          if polygon.tileInPolygon(x, y):
            self.setTile(x, y, WALL)
            
    #print(self._data)
    
  def getNeighbors(self, point):
    x, y = point[0], point[1]
    neighbors = []
    if x < self.x_size - 1:
      neighbors.append([x + 1, y])
    if x > 0:
      neighbors.append([x - 1, y])
    if y < self.y_size - 1:
      neighbors.append([x, y + 1])
    if y > 0:
      neighbors.append([x, y - 1])
    return neighbors
    
  def carvePath(self, position, pathLength, value):
    if pathLength == 0:
      return
    self.setTile(position[0], position[1], value)
    neighbors = self.getNeighbors(position)
    randomNeighbor = neighbors[int(random.random() * len(neighbors))]
    self.carvePath(randomNeighbor, pathLength - 1, value)
   
  def carveRandomPath(self, value):
    x = int(random.random() * self.x_size)
    y = int(random.random() * self.y_size)
    pathLength = int(random.random() * max(self.x_size, self.y_size))
    self.carvePath([x, y], pathLength, value)
    
world_width, world_height = 25, 25    
roomPoly, refillPoly = 10, 10

testWorld = World(world_width, world_height)
testWorld.createWorld(roomPoly, refillPoly)

for _ in range(8):
  testWorld.carveRandomPath(FREE);

print(np.matrix(testWorld._data))




#make a height map of size 16x20, with values ranging from 1 to 100, with moderate roughness
map1 = DiamondSquare.diamond_square((16,16),1,100,0.95)
print(np.vectorize(lambda x: int(x))(map1))
