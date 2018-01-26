#!/usr/bin/env python
import sys
import numpy as np
import random
import math


def rotateAboutPoint(origin, point, angle):
  # Get offset from origin
  x = point[0] - origin[0]
  y = point[1] - origin[1]
  # Calculate and store angles
  cos_a, sin_a = math.cos(angle), math.sin(angle)
  # Rotate about the point
  x_prime = x * cos_a - y * sin_a
  y_prime = y * cos_a + x * sin_a
  return [x_prime, y_prime]
  

class Polygon:
  
  def __init__(self, points):
    self.points = points
  
  def tileInPolygon(self, x, y):
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
    self._data = [[False for x in range(x_size)] for x in range(y_size)]
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
    
  def createWorld(self):
    cutPolygons, fillPolygons = [], []
 
    # Create many polygons
    for _ in range(10):
      width, height = int(random.random() * 10), int(random.random() * 10)
      tri1, tri2 = self.randomRectangle(width, height)
      cutPolygons.append(tri1)
      cutPolygons.append(tri2)
      
    for _ in range(5):
      width, height = int(random.random() * 10), int(random.random() * 10)
      tri1, tri2 = self.randomRectangle(width, height)
      fillPolygons.append(tri1)
      fillPolygons.append(tri2) 
    
    # Fill in the polygons, very slowly
    for x in range(0, self.x_size):
      for y in range(0, self.y_size):
        for polygon in cutPolygons:
          if polygon.tileInPolygon(x, y):
            self.setTile(x, y, True)
        for polygon in fillPolygons:
          if polygon.tileInPolygon(x, y):
            self.setTile(x, y, False)
            
    print(self._data)
    
    
testWorld = World(50, 50)
testWorld.createWorld()