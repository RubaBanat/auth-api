'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection.js');
const basicAuth = require('../../auth/middleware/basic')
const bearerAuth = require('../../auth/middleware/bearer')
const permissions = require('../../auth/middleware/acl.js')

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next("Invalid Model");
    }
  }
});

router.get('/:model',bearerAuth , handleGetAll);
router.get('/:model/:id',bearerAuth, permissions("read"), handleGetOne);
router.post('/:model',bearerAuth, permissions("create"), handleCreate);
router.put('/:model/:id', bearerAuth,permissions('update'), handleUpdate);
router.patch('/:model/:id', bearerAuth,permissions("update"), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions("delete"), handleDelete);

async function handleGetAll(req, res,next) {
    try {
      let allRecords = await req.model.get();
      res.status(200).json(allRecords);
    } catch (e) {
      next(e.message)
    }
  }
  
  async function handleGetOne(req, res,next) {
    try {
      const id = req.params.id;
      let theRecord = await req.model.get(id)
      res.status(200).json(theRecord);
    } catch (e) {
      next(e.message)
    }
  }
  
  async function handleCreate(req, res,next) {
    try {
      let obj = req.body;
      let newRecord = await req.model.create(obj);
      res.status(201).json(newRecord);
    } catch (e) {
      next(e.message)
  
    }
  }
  
  async function handleUpdate(req, res,next) {
    try {
      const id = req.params.id;
      const obj = req.body;
      let updatedRecord = await req.model.update(id, obj)
      res.status(200).json(updatedRecord);
    } catch (e) {
      next(e.message)
    }
  }
  
  async function handleDelete(req, res,next) {
    try {
      let id = req.params.id;
      let deletedRecord = await req.model.delete(id);
      res.status(200).json(deletedRecord);
    } catch (e) {
      next(e.message)
    }
  }


module.exports = router;
