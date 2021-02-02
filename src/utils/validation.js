import { Collection } from "react-materialize";

export const validateEmail = (email) => {
  if (email == "") return { isValid: false, error: "Field Requied" };
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email)) {
    return { isValid: true, error: null };
  } else {
    return { isValid: false, error: "Invalid Email" };
  }
};
export const validateName = (name) => {
  if (name === undefined || name == "" || name.length == 0)
    return { isValid: false, error: "Field Requied" };
  return { isValid: true, error: null };
};
export const validatePassword = (password) => {
  if (password == "") return { isValid: false, error: "Field Requied" };
  if (password.length < 8)
    return { isValid: false, error: "Min. length is 8 characters" };
  return { isValid: true, error: null };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword == "") return { isValid: false, error: "Field Requied" };
  if (password != confirmPassword)
    return { isValid: false, error: "passwords didnot match" };
  return { isValid: true, error: null };
};

export const validateDiceGame_BetValue = (bet, range) => {
  // console.log("in validateDiceGame_BetValue");
  try {
    if (isNaN(bet) || parseInt(bet) != bet || bet.toString().includes("."))
      throw new Error("Bet Value is supposed to be an integer");
    if(range){
      // console.log(range, bet, isInRange({...range, value: bet}));
      if(!isInRange({...range, value: bet}))
        throw new Error(`Min: ${range.min} Max: ${range.max}`);
    }
    return true;
  } catch (err) {
    // console.log(err);
    return err.message;
  }
  return true;
};

export const isInRange =({min, max, value})=> (value>=min && value<=max)

export const validateDiceGame_WinChance = (winChance, range) => {
  try {
    if (isNaN(winChance))
      throw new Error("Win Chance  is supposed to be a num");
    if(range){
      if(!isInRange({...range, value: winChance}))
        throw new Error(`Min: ${range.min} Max: ${range.max}`);
    }
    return true; 
  } catch (err) {
    // console.log(err);
    return err.message;
  }
};

export const validateDiceGame_Payout = (payout, range) => {
  try {
    if (isNaN(payout))
      throw new Error("Payout is supposed to be a num");
    if(range){
      if(!isInRange({...range, value: payout}))
        throw new Error(`Min: ${range.min} Max: ${range.max}`);
    }
    return true; 
  } catch (err) {
    // console.log(err);
    return err.message;
  }
  return true;
};

export const validateDiceGame_DiceValue = (dice, range)=>{
  try{
    if (isNaN(dice))
      throw new Error("Dice Value is supposed to be an num");
    if(range){
      if(!isInRange({...range, value: dice}))
        throw new Error(`Min: ${range.min} Max: ${range.max}`);
    }
    return true;
  }catch(err){
    return true;
  }
  return true;
}