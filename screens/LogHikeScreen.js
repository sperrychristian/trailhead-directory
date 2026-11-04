import { useState } from "react";
import { Text, StyleSheet, ScrollView, Alert } from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";

// Returns true only for real calendar dates in YYYY-MM-DD format
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return false;
  }

  return date.toISOString().slice(0, 10) === value;
}

function LogHikeScreen({ route, navigation }) {
  const trailName = route.params.trailName;

  const [inputs, setInputs] = useState({ date: "", miles: "", notes: "" });
  const [errors, setErrors] = useState({ date: "", miles: "" });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return { ...currentInputs, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {
    const date = inputs.date.trim();
    const miles = Number(inputs.miles);

    let dateError = "";
    if (date.length === 0) {
      dateError = "Please enter a date";
    } else if (!isValidDate(date)) {
      dateError = "Please enter a valid date (YYYY-MM-DD)";
    }

    let milesError = "";
    if (isNaN(miles) || miles <= 0) {
      milesError = "Please enter miles greater than 0";
    }

    setErrors({ date: dateError, miles: milesError });

    if (dateError || milesError) {
      return;
    }

    Alert.alert(
      "Hike Logged",
      `Trail: ${trailName}\nDate: ${date}\nMiles: ${miles}`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{trailName}</Text>
      <Input
        label="Date"
        invalid={!!errors.date}
        errorText={errors.date}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: (value) => inputChangeHandler("date", value),
          value: inputs.date,
        }}
      />
      <Input
        label="Miles"
        invalid={!!errors.miles}
        errorText={errors.miles}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: (value) => inputChangeHandler("miles", value),
          value: inputs.miles,
        }}
      />
      <Input
        label="Notes (optional)"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangeHandler("notes", value),
          value: inputs.notes,
        }}
      />
      <Button style={styles.button} onPress={submitHandler}>
        Save
      </Button>
    </ScrollView>
  );
}

export default LogHikeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f3d2b",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
