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