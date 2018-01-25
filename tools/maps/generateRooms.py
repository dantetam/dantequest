#!/usr/bin/env python
import sys
import numpy as np

class Polygon:
  
  def __init__(points):
    self.points = points
  
  def tileInPolygon(x, y):
    return pointInPolygon(x - 0.5, y) ||
      pointInPolygon(x + 0.5, y) ||
      pointInPolygon(x, y - 0.5) ||
      pointInPolygon(x, y + 0.5)
    
  # Source: http://alienryderflex.com/polygon_fill/
  def pointInPolygon(x, y):
    i = len(self.points) - 1
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
  
  def __init__(x_size, y_size):
    self._data = [[0 for x in range(x_size)] for x in range(y_size)]
    self.x_size = x_size
    self.y_size = y_size
    self.polygons = []
    
  def setTile(x, y, value):
    self._data[y][x] = value
    
  def createWorld:
    # Create many polygons
    
    
    # Fill in the polygons, very slowly
    for x in range(0, self.x_size):
      for y in range(0, self.y_size):
        for polygon in self.polygons:
          if polygon.tileInPolygon(x, y):
            setTile(x, y, True)