# API Reference

**Classes**

Name|Description
----|-----------
[ValheimWorld](#cdk-valheim-valheimworld)|*No description*


**Structs**

Name|Description
----|-----------
[ValheimWorldProps](#cdk-valheim-valheimworldprops)|*No description*



## class ValheimWorld  <a id="cdk-valheim-valheimworld"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ValheimWorld(scope: Construct, id: string, props?: ValheimWorldProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ValheimWorldProps](#cdk-valheim-valheimworldprops)</code>)  *No description*
  * **cpu** (<code>number</code>)  *No description* __*Optional*__
  * **desiredCount** (<code>number</code>)  *No description* __*Optional*__
  * **environment** (<code>Map<string, string></code>)  https://github.com/lloesche/valheim-server-docker#environment-variables. __*Optional*__
  * **fileSystem** (<code>[FileSystem](#aws-cdk-aws-efs-filesystem)</code>)  *No description* __*Optional*__
  * **image** (<code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code>)  *No description* __*Optional*__
  * **memoryLimitMiB** (<code>number</code>)  *No description* __*Optional*__
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**service** | <code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code> | <span></span>



## struct ValheimWorldProps  <a id="cdk-valheim-valheimworldprops"></a>






Name | Type | Description 
-----|------|-------------
**cpu**? | <code>number</code> | __*Optional*__
**desiredCount**? | <code>number</code> | __*Optional*__
**environment**? | <code>Map<string, string></code> | https://github.com/lloesche/valheim-server-docker#environment-variables.<br/>__*Optional*__
**fileSystem**? | <code>[FileSystem](#aws-cdk-aws-efs-filesystem)</code> | __*Optional*__
**image**? | <code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code> | __*Optional*__
**memoryLimitMiB**? | <code>number</code> | __*Optional*__
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



