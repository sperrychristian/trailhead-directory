// A Trail is the main record in the app (like a Meal in the Meals app).
//
// The constructor takes ONE object instead of a long list of arguments,
// so each value in dummy-data.js is labeled and the order doesn't matter.
class Trail {
  constructor({
    id,
    areaId,
    name,
    lengthMiles,      // round-trip distance
    elevationGainFt,
    difficulty,       // 'easy' | 'moderate' | 'hard'
    routeType,        // 'out-and-back' | 'loop'
    bestSeason,
    description,
    highlights,       // array of strings: what you'll see
    tips,             // array of strings: what to know before you go
    dogsAllowed,
    permitRequired,
    kidFriendly,
  }) {
    this.id = id;
    this.areaId = areaId;
    this.name = name;
    this.lengthMiles = lengthMiles;
    this.elevationGainFt = elevationGainFt;
    this.difficulty = difficulty;
    this.routeType = routeType;
    this.bestSeason = bestSeason;
    this.description = description;
    this.highlights = highlights;
    this.tips = tips;
    this.dogsAllowed = dogsAllowed;
    this.permitRequired = permitRequired;
    this.kidFriendly = kidFriendly;
  }
}

export default Trail;
