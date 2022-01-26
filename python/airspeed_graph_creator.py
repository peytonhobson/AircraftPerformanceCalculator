import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Airspeed_Input/airspeed0", "../data/Airspeed_Input/airspeed1", "../data/Airspeed_Input/airspeed2"]
plot_styles = { "../data/Airspeed_Input/airspeed0" : 'b-', "../data/Airspeed_Input/airspeed1" : 'b-', "../data/Airspeed_Input/airspeed2" : 'b-'}

data = {}
airspeed = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,1)
    airspeed.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('Airspeed_Output/airspeed.csv', airspeed, delimiter=',')

plt.xlim((4800, 5800))
plt.ylim(180,250)
plt.show()