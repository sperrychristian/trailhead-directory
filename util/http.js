import axios from "axios";

const BACKEND_URL = "https://expense-tracker-ddea6-default-rtdb.firebaseio.com";

export async function storeHike(hike) {
  const response = await axios.post(BACKEND_URL + "/hikes.json", hike);
  const id = response.data.name;
  return id;
}

// Firebase returns an object keyed by id, or null when there are no hikes
export async function fetchHikes() {
  const response = await axios.get(BACKEND_URL + "/hikes.json");
  const hikes = [];

  for (const key in response.data) {
    const hikeObj = {
      id: key,
      trailName: response.data[key].trailName,
      date: response.data[key].date,
      miles: response.data[key].miles,
      notes: response.data[key].notes,
    };
    hikes.push(hikeObj);
  }

  return hikes;
}
