#!/usr/bin/python
import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/temp0", "../data/temp500", "../data/temp1000", "../data/temp1500", "../data/temp2000"]
plot_styles = { "../data/temp0" : 'b-', "../data/temp500" : 'b-', "../data/temp1000" : 'b-', "../data/temp1500" : 'b-', "../data/temp2000" : 'b-'}

data = {}
temp = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    temp.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('output/temp.csv', temp, delimiter=',')

# plt.xlim((-40, 40))
# plt.ylim(0,28)
# plt.show()

curve_names = ["../data/mass0", "../data/mass1", "../data/mass2", "../data/mass3", "../data/mass4","../data/mass5","../data/mass6","../data/mass7"]
plot_styles = { "../data/mass0" : 'b-', "../data/mass1" : 'b-', "../data/mass2" : 'b-', "../data/mass3" : 'b-', "../data/mass4" : 'b-',"../data/mass5" : 'b-',"../data/mass6" : 'b-',"../data/mass7" : 'b-'}

data = {}
mass = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    mass.append(p)

    ynew=np.polyval(p,x)
    plt.plot(x,ynew)

np.savetxt('output/mass.csv', mass, delimiter=',')

# plt.xlim((3800, 5600))
# plt.ylim(0,28)
# plt.show()

curve_names = ["../data/drag0", "../data/drag1", "../data/drag2", "../data/drag3", "../data/drag4","../data/drag5","../data/drag6" ,"../data/drag7"]
plot_styles = { "../data/drag0" : 'b-', "../data/drag1" : 'b-', "../data/drag2" : 'b-', "../data/drag3" : 'b-', "../data/drag4" : 'b-',"../data/drag5" : 'b-',"../data/drag6" : 'b-',"../data/drag7" : 'b-'}

data = {}
drag = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,1)
    drag.append(p)

    ynew=np.polyval(p,x)
    plt.plot(x,ynew)

np.savetxt('output/drag.csv', drag, delimiter=',')

# plt.xlim(0, 0.02)
# plt.ylim(0,28)
# plt.show()

curve_names = ["../data/wind0", "../data/wind1", "../data/wind2", "../data/wind3", "../data/wind4","../data/wind5","../data/wind6" ,"../data/wind7"]
plot_styles = { "../data/wind0" : 'b-', "../data/wind1" : 'b-', "../data/wind2" : 'b-', "../data/wind3" : 'b-', "../data/wind4" : 'b-',"../data/wind5" : 'b-',"../data/wind6" : 'b-',"../data/wind7" : 'b-'}

data = {}
wind = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    wind.append(p)

    ynew=np.polyval(p,x)
    plt.plot(x,ynew)


np.savetxt('output/wind.csv', wind, delimiter=',')

# plt.xlim(-10, 10)
# plt.ylim(0,28)
# plt.show()

curve_names = ["../data/slope0", "../data/slope1", "../data/slope2", "../data/slope3", "../data/slope4","../data/slope5","../data/slope6" ,"../data/slope7"]
plot_styles = { "../data/slope0" : 'b-', "../data/slope1" : 'b-', "../data/slope2" : 'b-', "../data/slope3" : 'b-', "../data/slope4" : 'b-',"../data/slope5" : 'b-',"../data/slope6" : 'b-',"../data/slope7" : 'b-'}

data = {}
slope = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    slope.append(p)

    ynew=np.polyval(p,x)
    plt.plot(x,ynew)

np.savetxt('output/slopes.csv', slope, delimiter=',')

# plt.xlim(-2, 2)
# plt.ylim(0,28)
# plt.show()

curve_names = ["../data/fric0", "../data/fric1", "../data/fric2", "../data/fric3", "../data/fric4","../data/fric5","../data/fric6" ,"../data/fric7"]
plot_styles = { "../data/fric0" : 'b-', "../data/fric1" : 'b-', "../data/fric2" : 'b-', "../data/fric3" : 'b-', "../data/fric4" : 'b-',"../data/fric5" : 'b-',"../data/fric6" : 'b-',"../data/fric7" : 'b-'}

data = {}
fric = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    fric.append(p)

    ynew=np.polyval(p,x)
    plt.plot(x,ynew)

np.savetxt('output/friction.csv', fric, delimiter=',')

# plt.xlim(0.04, 0.16)
# plt.ylim(0,28)
# plt.show()
