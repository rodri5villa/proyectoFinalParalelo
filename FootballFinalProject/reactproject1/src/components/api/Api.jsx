export const leagueApi = {
    get: () => ({
        url: `https://localhost:44396/api/Leagues`,
        method: "GET",
    }),
    getById: (id) => ({
        url: `https://localhost:44396/api/Leagues/${id}`,
        method: "GET",
    }),
    create: (leagueData) => ({
        url: `https://localhost:44396/api/Leagues`,
        method: "POST",
        body: leagueData,
        headers: {
            "Content-Type": "application/json",
        },
    }),
    update: (id, leagueData) => ({
        url: `https://localhost:44396/api/Leagues/${id}`,
        method: "PUT",
        body: leagueData,
        headers: {
            "Content-Type": "application/json",
        },
    }),
    delete: (id) => ({
        url: `https://localhost:44396/api/Leagues/${id}`,
        method: "DELETE",
        body: null
    })
}

export const teamApi = {
    get: () => ({
        url: `https://localhost:44396/api/Teams`,
        method: "GET",
    }),
    getById: (id) => ({
        url: `https://localhost:44396/api/Teams/${id}`,
        method: "GET",
    }),
    getByLeagueId: (id) => ({
        url: `https://localhost:44396/api/Teams/League/${id}`,
        method: "GET",
    }),
    create: (teamData) => ({
        url: `https://localhost:44396/api/Teams`,
        method: "POST",
        body: teamData,
        headers: {
            "Content-Type": "application/json",
        },
    }),
    update: (id, teamData) => ({
        url: `https://localhost:44396/api/Teams/${id}`,
        method: "PUT",
        body: teamData,
        headers: {
            "Content-Type": "application/json",
        },
    }),
    delete: (id) => ({
        url: `https://localhost:44396/api/Teams/${id}`,
        method: "DELETE",
        body: null
    })
}