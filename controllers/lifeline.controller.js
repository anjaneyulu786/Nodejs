const { Lifeline } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, lifeline;
    let user = req.user;

    let lifeline_info = req.body;


    [err, lifeline] = await to(Lifeline.create(lifeline_info));
    if(err) return ReE(res, err, 422);

    lifeline.addUser(user, { through: { status: 'started' }})

    [err, lifeline] = await to(lifeline.save());
    if(err) return ReE(res, err, 422);

    let lifeline_json = lifeline.toWeb();
    // lifeline_json.users = [{user:user.id}];

    return ReS(res, {lifeline:lifeline_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    
        let user = req.user;
    
        return ReS(res, {user:user});
}
module.exports.getAll = getAll;

const get = function(req, res){
    let lifeline = req.lifeline;

    return ReS(res, {lifeline:lifeline.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, lifeline, data;
    lifeline = req.lifeline;
    data = req.body;
    lifeline.set(data);

    [err, lifeline] = await to(lifeline.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated Lifeline: '+user.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let lifeline, err;
    lifeline = req.lifeline;

    [err, lifeline] = await to(lifeline.destroy());
    if(err) return ReE(res, 'error occured trying to delete the lifeline');

    return ReS(res, {message:'Deleted lifeline'}, 204);
}
module.exports.remove = remove;