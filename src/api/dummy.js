const dummyParticipants = [
  [
      {
        id: 0,
        name: "EUA",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
            {
                name: "John Jones",
                role: "Developer"
            },
            {
                name: "John Jones",
                role: "Developer"
            },
            {
                name: "John Jones",
                role: "Developer"
            }
        ]
      },
      {
        id: 1,
        name: "CI",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      },
      {
        id: 2,
        name: "Tech CI",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      },
      {
        id: 3,
        name: "Release",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      },
      {
        id: 4,
        name: "FES",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      },
      {
        id: 5,
        name: "Small Projects",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      },
      {
        id: 6,
        name: "Small",
        image: "https://via.placeholder.com/400",
        lead: {
          name: "John Jones"
        },
        members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
      }
  ],
  [
    {
      id: 0,
      name: "EUA",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          },
          {
              name: "John Jones",
              role: "Developer"
          }
      ]
    },
    {
      id: 1,
      name: "CI",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
    },
    {
      id: 2,
      name: "Tech CI",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
    },
    {
      id: 3,
      name: "Release",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
    },
    {
      id: 4,
      name: "FES",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
    },
    {
      id: 5,
      name: "Small Projects",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
    },
    {
      id: 6,
      name: "Small",
      image: "https://via.placeholder.com/400",
      lead: {
        name: "John Jones"
      },
      members: [
        {
            name: "John Jones",
            role: "Developer"
        },
        {
            name: "John Jones",
            role: "Developer"
        }
    ]
  }
  ]
]

const baStandup = {
  name: "Access UK BA Standup",
      participants: dummyParticipants[0]
}

const mainStandup = {
  name: "Access UK Main Standup",
      participants: dummyParticipants[1]
}

export const dummyApi = (id) => {
  if (id === 0) 
    return baStandup;
  else
    return mainStandup;
}