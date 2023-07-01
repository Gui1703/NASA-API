import * as stationsDataBase from "../repositories/stationsRepository.js";
import * as erro from "../utils/erro.js";
export async function findStationOrThowErro(stationName) {
    const station = await stationsDataBase.findByName(stationName);
    if (!station)
        throw erro.notFound("Not foud station with this name");
    return station;
}
