import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({ label, invalid, errorText, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f3d2b",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    color: "#1f3d2b",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#8fae98",
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#b3261e",
  },
  invalidInput: {
    borderColor: "#b3261e",
    borderWidth: 2,
  },
  errorText: {
    fontSize: 12,
    color: "#b3261e",
    marginTop: 4,
  },
});
