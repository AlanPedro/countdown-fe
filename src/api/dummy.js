const dummyMainStandupParticipants = [
  {id: 1, name: "Releases", speaker: "Steff", allocationInSeconds: 30},
  {id: 6, name: "Tech CI", speaker: "Dominic", allocationInSeconds: 60},
  {id: 9, name: "CWI", speaker: "Shiv", allocationInSeconds: 60},
  {id: 4, name: "Out of Country", speaker: "Victor", allocationInSeconds: 60},
  {id: 8, name: "Small projects", speaker: "Jeremy", allocationInSeconds: 45},
  {id: 2, name: "Fes", speaker: "Fred", allocationInSeconds: 60},
  {id: 5, name: "CI", speaker: "Katie", allocationInSeconds: 45},
  {id: 3, name: "L3", speaker: "David", allocationInSeconds: 30},
  {id: 7, name: "Standard Sections", speaker: "Daniel", allocationInSeconds: 30},
  {id: 11, name: "Any other business", speaker: "Anyone", allocationInSeconds: 45},
  {id: 10, name: "Actions", speaker: "Matt", allocationInSeconds: 30}
]

const dummyMainStandup = {
  id: 0,
  name: "main",
  displayName: "Access UK Main Dummy Team",
  teams: dummyMainStandupParticipants
}

export default dummyMainStandup;