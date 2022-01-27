#!/usr/bin/python
import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Landing_Distance_Input/landingdist0", "../data/Landing_Distance_Input/landingdist1"]
plot_styles = { "../data/Landing_Distance_Input/landingdist0" : 'b-', "../data/Landing_Distance_Input/landingdist1" : 'b-'}

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

np.savetxt('Landing_Distance_Output/landingdist.csv', dist, delimiter=',')

plt.xlim(4000, 6000)
plt.ylim(400,1600)
plt.show()

