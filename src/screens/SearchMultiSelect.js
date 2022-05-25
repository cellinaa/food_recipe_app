import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

import { COLORS } from '../constants';
import { CustomButton } from '../components';
import { AuthContext } from '../context/AuthContext';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },
  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];

const SearchMultiSelect = () => {
  const { dataRecipe } = useContext(AuthContext);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);

  const recipeOptions = dataRecipe.map((value) => {
    return {
      item: value.name,
      id: value.id,
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={{ margin: 30 }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, paddingBottom: 20 }}>Recipe</Text>
        </View>
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Recipe</Text>
        <SelectBox
          label="Select single"
          options={recipeOptions}
          value={selectedTeam}
          onChange={onChange()}
          hideInputFilter={false}
          arrowIconColor={COLORS.darkGreen}
          searchIconColor={COLORS.darkGreen}
        />
        <View style={{ height: 40 }} />
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>
          MultiSelect Recipe
        </Text>
        <SelectBox
          label="Select multiple"
          options={recipeOptions}
          selectedValues={selectedTeams}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          arrowIconColor={COLORS.darkGreen}
          searchIconColor={COLORS.darkGreen}
          multiOptionContainerStyle={{
            backgroundColor: COLORS.darkGreen,
          }}
          toggleIconColor={COLORS.darkGreen}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 30,
          justifyContent: 'center',
        }}>
        {/* Login */}
        <CustomButton
          buttonText="Submit"
          buttonContainerStyle={{
            paddingVertical: 18,
            borderRadius: 20,
          }}
          colors={[COLORS.darkGreen, COLORS.lime]}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </SafeAreaView>
  );

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onChange() {
    return (val) => setSelectedTeam(val);
  }

  function handleSubmit() {
    // console.log(recipeOptions);
    console.log(selectedTeam);
    console.log(selectedTeams);
  }
};

export default SearchMultiSelect;
