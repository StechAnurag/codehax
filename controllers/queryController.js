const sendEmail = require('./emailController');
const { firebaseDB } = require('../firebase.config');
const { addDoc, getDocs, query, collection, serverTimestamp, orderBy, limit } = require('firebase/firestore');
const Joi = require('joi');

exports.handleQuery = async (req, res, next) => {
  try {
    return res.send('submitted');
    // 0) validate and sanitize the req.body
    const schema = Joi.object({
      from: Joi.string().min(2).max(30).required(),
      contactEmail: Joi.string().email().required(),
      subject: Joi.string().min(2).max(50).required(),
      message: Joi.string().min(2).max(500).required(),
      type: Joi.string().valid('query', 'contact', 'quote', 'help', 'complaint').default('query').required(),
      contactNumber: Joi.string()
        .min(6)
        .max(15)
        .pattern(/^[0-9]+$/)
    });
    const queryDoc = {
      from: req.body.from,
      contactEmail: req.body.contactEmail,
      subject: req.body.subject,
      type: req.body.type || 'query',
      message: req.body.message,
      resolved: false,
      timestamp: serverTimestamp()
    };

    const { error: validationErr } = schema.validate(req.body);
    if (validationErr) {
      const message = validationErr.details[0]?.message || 'validation failed';
      return res.json({ status: 'failed', code: 400, error: message });
    }

    if (req.body.contactNumber) {
      queryDoc.contactNumber = req.body.contactNumber;
    }

    // 1) save query into database

    const docRef = await addDoc(collection(firebaseDB, 'aikyam_queries'), queryDoc);
    // console.log(docRef.id);

    // 2) send response
    res.status(201).json({ status: 'success', code: 201, message: 'Query submitted successfully!' });

    // 3)send email to admin in background
    // sendEmail({
    //   emailTo: 'sachin.limkar@aikyamss.com',
    //   subject: 'First mail',
    //   message: 'New query arrived'
    // });

    // (optional)
    // 4) update query into database as resolved
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.fetchAllQueries = async (req, res, next) => {
  try {
    // 1) save query into database
    const collectionRef = collection(firebaseDB, 'aikyam_queries');
    const queryObj = query(collectionRef, orderBy('timestamp', 'desc'), limit(req.query.limit || 10));
    const documents = await getDocs(queryObj);
    const allQueries = [];
    documents.forEach(doc => {
      allQueries.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // 2) send response
    res.json({ status: 'success', code: 200, message: 'fetched successfully!', data: allQueries });

    // 3)send email to admin in background
    // sendEmail({
    //   emailTo: 'sachin.limkar@aikyamss.com',
    //   subject: 'First mail',
    //   message: 'New query arrived'
    // });

    // (optional)
    // 4) update query into database as resolved
  } catch (err) {
    console.log(err);
    next(err);
  }
};
