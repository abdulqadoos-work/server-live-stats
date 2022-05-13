const ExceptionResponse = require("../responses/ExceptionResponse");
const GameService = require("../services/GameService");
const SuccessResponse = require("../responses/SuccessResponse");
const RequestValidationResponse = require("../responses/RequestValidationResponse");
const modelInstance = require("../models");
const GetAllGamesResponse = require("../responses/GetAllGamesResponse");
const SportModal = modelInstance.sport;
const TeamModal = modelInstance.team;

const create = async (req, res, next) => {
    try{
        const {sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround} = req.body;
        if((await validateIds({sportId, team1Id, team2Id}, res)))
            return '';
        await GameService.create({sportId, dateTime, location, team1Id, team2Id, team1PlayGround, team2PlayGround})
        return res.send(SuccessResponse('Game created successfully'))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

const getAll = async (req, res, next) => {
    try{
        const games = await GameService.getAll();
        return res.send(GetAllGamesResponse(games))
    }catch (err) {
        return res.status(500).send(ExceptionResponse(err.message))
    }
}

module.exports = {
    create, getAll
}

const validateIds = async ({sportId, team1Id, team2Id}, res) => {
    if (!(await SportModal.findByPk(sportId))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Sport id is incorrect'}));
    }
    if (!(await TeamModal.findByPk(team1Id))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Team 1 id is incorrect'}));
    }
    if (!(await TeamModal.findByPk(team2Id))?.id) {
        return res.status(400).send(RequestValidationResponse({sportId: 'Team 2 id is incorrect'}));
    }
    return false;
}
