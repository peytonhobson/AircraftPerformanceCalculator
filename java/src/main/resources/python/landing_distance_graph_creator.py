import matplotlib.pyplot as plt
import numpy as np
import csv

curve_names = ["../data/Landing_Distance_Input/landingdist-clean0", "../data/Landing_Distance_Input/landingdist-clean1", "../data/Landing_Distance_Input/landingdist-combat0", "../data/Landing_Distance_Input/landingdist-combat1"]
plot_styles = { "../data/Landing_Distance_Input/landingdist-clean0" : 'b-', "../data/Landing_Distance_Input/landingdist-clean1" : 'b-', "../data/Landing_Distance_Input/landingdist-combat0" : 'b-',  "../data/Landing_Distance_Input/landingdist-combat1" : 'b-'}

data = {}
dist = []
for name in curve_names:
    data = np.loadtxt("{}.csv".format(name), delimiter=',')


    x = data[:,0]
    y = data[:,1]

    p = np.polyfit(x,y,1)
    dist.append(p)

    ynew=np.polyval(p,x)

    plt.plot(x,ynew)

np.savetxt('Landing_Distance_Output/landingdist.csv', dist, delimiter=',')

plt.xlim((3000, 5600))
plt.ylim(700,1300)
plt.show()