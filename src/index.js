import mongoose from 'mongoose';
import express, { query } from 'express';
import { notFound, errorHandler } from './middlewares.js';
import Form from './schemas/formSchema.js';
import cors from 'cors';

const PORT = process.env.PORT || 8080;

const uri =  "mongodb+srv://test:test@database.z8rygn4.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
  }
}

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const save = async (data) => {
  const response = await Form.create(data);
  // console.log(response);
}

app.get('/', (req, res) => {
  res.json({
    message: 'working...',
  });
});

app.post('/save', (req, res) => {
  try {
    if ( req.body ) {
      save(req.body);
      res.status(200).json({message: 'Data saved in DB!'});
      console.log('Data saved in DB!');
    } else {
      res.status(500).json({message: "Something went wrong!"});
    }
  } catch (error) {
    res.status(500).json({message: "Something went wrong!!"});
  }
})

app.get('/responses', (req, res) => {
  console.log('responses called!');
  Form.find({}, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/age', (req, res) => {
  const query = {$and: [{age: {$gte: req.query.ageMin}}, {age: {$lte: req.query.ageMax}}]};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/gender', (req, res) => {
  const gender = JSON.parse(req.query.gender);
  const queryParam = [];
  if (gender.male) {
    queryParam.push('male');
  }
  if (gender.female) {
    queryParam.push('female');
  }
  if (gender.other) {
    queryParam.push('other');
  }
  const query = {gender: {$in: queryParam}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/education', (req, res) => {
  const education = JSON.parse(req.query.education);
  const queryParam = [];
  if (education.middleSchool) {
    queryParam.push('middleSchool');
  }
  if (education.highSchool) {
    queryParam.push('highSchool');
  }
  if (education.universityStudies) {
    queryParam.push('universityStudies');
  }
  const query = {};
  Form.find({education: {$in: queryParam}}, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/usingSmartDevices', (req, res) => {
  const query = {$and: [{usingSmartDevices: {$gte: req.query.usingSmartDevicesMin}}, {usingSmartDevices: {$lte: req.query.usingSmartDevicesMax}}]};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/activity', (req, res) => {
  const activityParam = JSON.parse(req.query.activity);
  const queryParam = [];
  if (activityParam.studying) {
    queryParam.push({'activity.studying': true});
  }
  if (activityParam.working) {
    queryParam.push({'activity.working': true});
  }
  if (activityParam.retired) {
    queryParam.push({'activity.retired': true});
  }
  if (activityParam.unemployed) {
    queryParam.push({'activity.unemployed': true});
  }
  const query = {$or: queryParam};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/ownedDevices', (req, res) => {
  const ownedDevicesParam = JSON.parse(req.query.ownedDevices);
  const queryParam = [];
  if (ownedDevicesParam.smartphone) {
    queryParam.push({'ownedDevices.smartphone': true});
  }
  if (ownedDevicesParam.tablet) {
    queryParam.push({'ownedDevices.tablet': true});
  }
  if (ownedDevicesParam.smartwatch) {
    queryParam.push({'ownedDevices.smartwatch': true});
  }
  if (ownedDevicesParam.smartband) {
    queryParam.push({'ownedDevices.smartband': true});
  }
  const query = {$or: queryParam};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/reasons', (req, res) => {
  const reasonsParam = JSON.parse(req.query.reasons);
  const queryParam = [];
  if (reasonsParam.entertainment) {
    queryParam.push({'reasons.entertainment': true});
  }
  if (reasonsParam.communication) {
    queryParam.push({'reasons.communication': true});
  }
  if (reasonsParam.reading) {
    queryParam.push({'reasons.reading': true});
  }
  if (reasonsParam.health) {
    queryParam.push({'reasons.health': true});
  }
  if (reasonsParam.organising) {
    queryParam.push({'reasons.organising': true});
  }
  if (reasonsParam.information) {
    queryParam.push({'reasons.information': true});
  }
  const query = {$or: queryParam};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/monthlyAmount', (req, res) => {
  const monthlyAmountParam = JSON.parse(req.query.monthlyAmount);
  const queryParam = [];
  if (monthlyAmountParam['0-500']) {
    queryParam.push('0-500');
  }
  if (monthlyAmountParam['501-1700']) {
    queryParam.push('501-1700');
  }
  if (monthlyAmountParam['1701-2500']) {
    queryParam.push('1701-2500');
  }
  if (monthlyAmountParam['2501+']) {
    queryParam.push('2501+');
  }
  const query = {monthlyAmount: {$in: queryParam}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/monetization', (req, res) => {
  const monetization = JSON.parse(req.query.monetization);
  const queryParam = [];
  if (monetization.yes) {
    queryParam.push('yes');
  }
  if (monetization.no) {
    queryParam.push('no');
  }
  console.log(queryParam);
  const query = {subscription: {$in: queryParam}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/monetizationLevel', (req, res) => {
  const monetizationLevel = JSON.parse(req.query.monetizationLevel);
  const queryParam = [];
  if (monetizationLevel['0-5']) {
    queryParam.push('0-5');
  }
  if (monetizationLevel['1-15']) {
    queryParam.push('1-15');
  }
  if (monetizationLevel['16-35']) {
    queryParam.push('16-35');
  }
  if (monetizationLevel['35-50']) {
    queryParam.push('35-50');
  }
  if (monetizationLevel['50+']) {
    queryParam.push('50+');
  }
  const query = {subscriptionAmount: {$in: queryParam}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/workIndustry', (req, res) => {
  const workIndustry = JSON.parse(req.query.workIndustry);
  const queryParam = [];
  if (workIndustry['advertising&marketing']) {
    queryParam.push('advertising&marketing');
  }
  if (workIndustry.aerospace) {
    queryParam.push('aerospace');
  }
  if (workIndustry.agriculture) {
    queryParam.push('agriculture');
  }
  if (workIndustry.art) {
    queryParam.push('art');
  }
  if (workIndustry['computer&technology']) {
    queryParam.push('computer&technology');
  }
  if (workIndustry.construction) {
    queryParam.push('construction');
  }
  if (workIndustry.education) {
    queryParam.push('education');
  }
  if (workIndustry.energy) {
    queryParam.push('energy');
  }
  if (workIndustry.entertainment) {
    queryParam.push('entertainment');
  }
  if (workIndustry.fashion) {
    queryParam.push('fashion');
  }
  if (workIndustry['food&beverage']) {
    queryParam.push('food&beverage');
  }
  if (workIndustry.health) {
    queryParam.push('health');
  }
  if (workIndustry.hospitality) {
    queryParam.push('hospitality');
  }
  if (workIndustry.manufacturing) {
    queryParam.push('manufacturing');
  }
  if (workIndustry['media&news']) {
    queryParam.push('media&news');
  }
  if (workIndustry.mining) {
    queryParam.push('mining');
  }
  if (workIndustry.pharmaceutical) {
    queryParam.push('pharmaceutical');
  }
  if (workIndustry.politics) {
    queryParam.push('politics');
  }
  if (workIndustry.sales) {
    queryParam.push('sales');
  }
  if (workIndustry.telecomunications) {
    queryParam.push('telecomunications');
  }
  if (workIndustry.transportation) {
    queryParam.push('transportation');
  }

  const query = {workIndustry: {$in: queryParam}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.get('/find/country', (req, res) => {
  const countries = JSON.parse(req.query.countries);
  const query = {country: {$in: countries}};
  Form.find(query, (err, responses) => {
    if (err) {
      console.log(err);
    }
    res.json(responses);
  });
});

app.post('/device', (req, res) => {
  try {
    if ( req.body ) {
      console.log(req.body);
      res.status(200).json({message: 'received type'});
      console.log('received type');
    } else {
      res.status(500).json({message: "Something went wrong!"});
    }
  } catch (error) {
    res.status(500).json({message: "Something went wrong!!"});
  }
})

app.use(notFound);
app.use(errorHandler);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
  });
});