#!/usr/bin/python
import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Takeoff_Distance_Input/takeoffdist0", "../data/Takeoff_Distance_Input/takeoffdist1"]
plot_styles = { "../data/Takeoff_Distance_Input/takeoffdist0" : 'b-', "../data/Takeoff_Distance_Input/takeoffdist1" : 'b-'}

data = {}
dist = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    dist.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('Takeoff_Distance_Output/takeoffdist.csv', dist, delimiter=',')

plt.xlim(4000, 6000)
plt.ylim(400,1600)
plt.show()

