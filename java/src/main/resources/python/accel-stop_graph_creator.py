#!/usr/bin/python
import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Accel-Stop_Input/accel-stop-concrete", "../data/Accel-Stop_Input/accel-stop-grassy"]
plot_styles = { "../data/Accel-Stop_Input/accel-stop-concrete" : 'b-', "../data/Accel-Stop_Input/accel-stop-grassy" : 'b-'}

data = {}
accel = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    accel.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('Accel-Stop_Output/accel-stop.csv', accel, delimiter=',')

# plt.xlim((4000, 6000))
# plt.ylim(800,2000)
# plt.show()

