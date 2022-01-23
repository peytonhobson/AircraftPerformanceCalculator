#!/usr/bin/python
import matplotlib.pyplot as plt
import numpy as np

curve_names = ["../data/temp0", "../data/temp500", "../data/temp1000", "../data/temp1500", "../data/temp2000"]
plot_styles = { "../data/temp0" : 'b-', "../data/temp500" : 'b-', "../data/temp1000" : 'b-', "../data/temp1500" : 'b-', "../data/temp2000" : 'b-'}

data = {}
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]
    xnew = np.linspace(-40, 40, 100)

    p = np.polyfit(x,y,3)
    ynew=np.polyval(p,x)
    plt.plot(x,ynew)

plt.xlim((-40, 40))
plt.ylim(0,28)
plt.show()

