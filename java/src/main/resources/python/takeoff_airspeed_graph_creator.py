import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Takeoff_Airspeed_Input/takeoffairspeed0", "../data/Takeoff_Airspeed_Input/takeoffairspeed1", "../data/Takeoff_Airspeed_Input/takeoffairspeed2"]
plot_styles = { "../data/Takeoff_Airspeed_Input/takeoffairspeed0" : 'b-', "../data/Takeoff_Airspeed_Input/takeoffairspeed1" : 'b-', "../data/Takeoff_Airspeed_Input/takeoffairspeed2" : 'b-'}

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

np.savetxt('Takeoff_Airspeed_Output/takeoffairspeed.csv', airspeed, delimiter=',')

plt.xlim((4800, 5800))
plt.ylim(180,250)
plt.show()