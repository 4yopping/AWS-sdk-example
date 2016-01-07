'use strict'

const AWS = require('aws-sdk')
const Promise = require('bluebird')

AWS.config.region = 'us-east-1'

let ec2 = Promise.promisifyAll(new AWS.EC2())

// Get instance's details
ec2.describeInstancesAsync({InstanceIds: ['i-8575a768']})
.then(data => {
  console.log(data.Reservations[0])
})
.catch(err => {
  console.log('Error')
})

let params = {
  ImageId: 'ami-xxxxxx', 
  InstanceType: 't2.micro',
  SubnetId: 'subnet-xxxxx',
  KeyName: 'xxxxxx-xxxxxx',
  IamInstanceProfile: {
    "Arn": "arn:aws:iam::079577709174:instance-profile/ecsInstanceRole"
  },
  MinCount: 1,
  MaxCount: 1
}

ec2.runInstancesAsync(params)
.then(data => {
  let instanceId = data.Instances[0].InstanceId
  console.log("Created instance", instanceId)
  console.log(data.Instances[0])
  let identi = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111)

  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: '4yopping-' + identi}
  ]}
  return ec2.createTagsAsync(params)
})
.then(data => {
  console.log('Tag created')
})
.catch(err => {
  console.log('Tag failed')
})
.catch(err => {
  console.log('Could not create instance')
})
