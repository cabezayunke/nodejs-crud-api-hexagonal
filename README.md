# nodejs-crud-api-hexagonal
NodeJS REST API following principles of hexagonal architecture and with adjustments for Javascript and functional programming.

Hexagonal architecture is also known as Ports & Adapters.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hexagonal_Architecture.svg/313px-Hexagonal_Architecture.svg.png)

Due to Javascript prototypal nature we do not have interfaces so we can't have ports. Although we could implement so sort of mechanism to create the ports and enforce them,
we are going to assume developers are responsible people and that adapters are implemented properly.

Also, for the sake of simplicity, we will not use DTO objects to move data between layers, but just plain javascript objects instead.
Again, they are not checked or enforced in any way, we will assume the developers will use them correctly.

If these assumptions are a problem or may be in the future, we could use Typescript to have proper ports and DTOs.

PS: google it if you need more info about it.

### Architecture

> Actors
>
> - primary/drivers (input)
>    - WebServer/Router
>    - Other (CLI, tests, queues (consumer), GUIs, etc)
> - secondary/driven (connection to infrastructure)
>    - Database (DAO, Model)
>    - Cache
>    - Other (3rd party APIs, queues (publish), emails, etc)

> Adapters
>
> - primary/drivers (input)
>    - Controller (connects Router to Business logic)
> - secondary/driven (connection to infrastructure)
>    - Repository (connects Business logic to data)

> Application/Business Logic
>
> - validation logic
> - business logic
> - DAL integration through repository

### Changes 

Improvements from a [layered architecture](https://github.com/cabezayunke/nodejs-crud-api-layered-architecture)

* Repository pattern added, which is used by the business logic layer to connect to data. 
The business logic layer knows nothing about how the data is stored or retrieved.
The repository takes care of syncing the data between the DB and cache as well as retrieving always from cache first, if available.
* Validation logic is run from the application layer and not coupled to the controller, so the implementation can be swapped easily and tested in isolation.
* DB Model decoupled from business logic (DAO functions now return plain objects, which we will use as DTO).
* Added DI (dependency injection)
* Added CompositionRoot, which takes care of creating all dependencies and initiating connections to external infrastructure (Mongo, Redis, etc)
* Created test doubles (Stubs and Spies) to use in tests and be able to unit test business logic without any knowledge of infrastructure or entry point whatsoever.

### Further improvements

For further scalability or more complex projects we could look into:
* Async writes
* Saga pattern
* CQRS

