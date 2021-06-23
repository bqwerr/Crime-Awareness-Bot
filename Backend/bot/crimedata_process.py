import numpy as np
import pandas as pd
import os
import io

"""
Python script to get values from Crime data CSV file using Pandas dataframes.
Data is retrieved based on entities recognized in the provided query by dialogflow agent.

"""

fields = "state_ut year murder attempt_to_murder rape kidnapping_abduction dacoity robbery burglary theft auto_theft riots criminal_breach_of_trust cheating counterfeiting arson hurt_grevious_hurt dowry_deaths causing_death_by_negligence total_ipc_crimes".split(" ")
keys  = list(fields)
cols = ['State', 'Year', 'Murder', 'Murder Attempt', 'Rape', 'Kidnapping', 'Dacoity', 'Robbery', 'Burglary', 'Theft', 'Riots', 'Cheating', 'Counterfeit', 'Arson', 'Total IPC']
path = os.path.join(os.path.dirname(os.path.dirname(__file__)),'crime_data.csv')
df=pd.read_csv(path, low_memory=False)
df["total_ipc_crimes"]=df["total_ipc_crimes"].fillna(0)
grouped = df.groupby(['state_ut','year']).sum().reset_index()
district_grouped = df.groupby(['district','year']).sum().reset_index()

new = pd.DataFrame(zip(grouped.state_ut,grouped.year,grouped.total_ipc_crimes))
new.columns=["state","year","cases"]
distinct=list(set(new["state"]))
states={}

for i in distinct:
    states[i]=[]
for i in states.keys():
        for j in range(len(new)):
            if new.loc[j,'state']==i:
                states[i].append(new.loc[j,'cases'])


def get_by_state_year(state, year):
    return grouped.loc[(grouped['state_ut'] == state) & (grouped['year'] == year),'total_ipc_crimes']    

def get_by_district_crimes(district, crimes):
    return district_grouped.loc[district_grouped['district'] == district, crimes].values[0]   

def get_by_district_year(district, year):
    return district_grouped.loc[(district_grouped['district'] == district) & (district_grouped['year'] == year), 'total_ipc_crimes'].values[0]  

def get_by_district_crimes_year(district, crimes, year):
    return district_grouped.loc[(district_grouped['district'] == district) & (district_grouped['year'] == year), crimes].values[0]   

def get_by_state_crimes_year(state, crimes, year):
    return grouped.loc[(grouped['state_ut'] == state) & (grouped['year'] == year), crimes].values[0]   

def helper(entities):
    required = []
    for key in entities:
        if entities[key]:
            required.append(key)
    if not required:
        return 'Please Input the query using State, District, Year, or Crime Type..'

    if 'geo-state' in required and 'date-period' in required and 'crimes' in required:
        val = get_by_state_crimes_year(entities['geo-state'].lower(), entities['crimes'], entities['date-period'])
        ans = ''
        for idx, type in enumerate(entities['crimes']):
            ans += type + '-' + str(val[idx]) + ' '
        return ans + '. These are the results for provided inputs.'

    elif 'geo-state' in required and 'date-period' in required:
        val = get_by_state_year(entities['geo-state'].lower(), entities['date-period'])
        val = int(list(val)[0])
        return "There were " + str(val) + " crimes taken place in " + entities['geo-state'] + " state for year " + str(entities['date-period'])
    
    elif 'geo-city' in required and 'crimes' in required and 'date-period' in required:
        val = get_by_district_crimes_year(entities['geo-city'].lower(), (entities['crimes']), entities['date-period'])
        ans = ''
        for idx, type in enumerate(entities['crimes']):
            ans += type + '-' + str(val[idx]) + ' '
        return ans + '. These are the results for given crime types.'
        
    elif 'geo-city' in required and 'date-period' in required:
        val = get_by_district_year(entities['geo-city'].lower(), entities['date-period'])
        return "There were " + str(int(val)) + " crimes taken place in " + entities['geo-city'] + " district for year " + str(entities['date-period'])

    elif 'geo-city' in required and 'crimes' in required:
        val = get_by_district_crimes(entities['geo-city'].lower(), (entities['crimes']))
        ans = ''
        for idx, type in enumerate(entities['crimes']):
            ans += type + '-' + str(val[idx]) + ' '
        return ans + '. These are the results for given crime types.'

    elif 'geo-state' in required:
        val = states[entities['geo-state'].lower()]
        return "Total crimes for state " + entities['geo-state'] + " are " + str(int(sum(val)))

    return "Please provide valid information.."

def get_stats():
    state_year =[]
    
    for index, r in grouped.iterrows():
        my_list = r[keys]
        state_year.append(my_list.to_dict())
    
    json_result = {
        'State & Year': {
            'rows': len(state_year), 
            'cols': len(keys),  
            'rowData': state_year,
        }
    }
    return json_result

def get_by_state(state):
    stats = []
    vals = states[state][:-1]
    stats.append(["Year", "State"])
    years = list(range(2001, 2014))
    idx = 0
    for val in vals:
        stats.append([years[idx], val])
        idx += 1
    return stats
