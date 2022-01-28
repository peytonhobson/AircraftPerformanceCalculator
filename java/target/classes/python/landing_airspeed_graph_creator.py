import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Landing_Airspeed_Input/landingairspeed0", "../data/Landing_Airspeed_Input/landingairspeed1", "../data/Landing_Airspeed_Input/landingairspeed2", "../data/Landing_Airspeed_Input/landingairspeed3"]
plot_styles = { "../data/Landing_Airspeed_Input/landingairspeed0" : 'b-',"../data/Landing_Airspeed_Input/landingairspeed1" : 'b-', "../data/Landing_Airspeed_Input/landingairspeed2" : 'b-', "../data/Landing_Airspeed_Input/landingairspeed3" : 'b-'}

data = {}
airspeed = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,3)
    airspeed.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('Landing_Airspeed_Output/landingairspeed.csv', airspeed, delimiter=',')

# plt.xlim((3600, 5000))
# plt.ylim(140,250)
# plt.show()