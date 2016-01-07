'use strict'

const AWS = require('aws-sdk')
const Promise = require('bluebird')

AWS.config.region = 'us-east-1'

let ecs = Promise.promisifyAll(new AWS.ECS())

// Create Cluster
ecs.createClusterAsync({"clusterName": "MyNewCluster"})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log('Could not create cluster')
})

// List clusters
ecs.listClustersAsync()
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log('Could not list cluster')
})

let task = {
  "containerDefinitions": [
  {
    "name": "sleep",
    "image": "busybox",
    "cpu": 10,
    "command": [
      "sleep",
      "360"
    ],
    "memory": 10,
    "essential": true
  }
],
"family": "sleep360"
}

// Register new task definition
ecs.registerTaskDefinitionAsync(task)
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log('Could not register task')
})

// List task definitions
ecs.listTaskDefinitionFamiliesAsync()
.then(data => {
  console.log(data.families[6])
  return ecs.listTaskDefinitionsAsync({"familyPrefix": data.families[6]})
})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log('Could not list cluster')
})
.catch(err => {
  console.log('Could not list cluster')
})

// List container instances
ecs.listContainerInstancesAsync()
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log('Could not list container instances')
})

let params = {
  cluster: 'arn:aws:ecs:us-east-1:079577709174:cluster/MyNewCluster',
  containerInstanceArn: 'arn:aws:ecs:us-east-1:079577709174:container-instance/924ead2b-c8e2-43fb-92c7-65430f1346e0'
};


ecs.registerContainerInstanceAsync(params)
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log(err)
})
