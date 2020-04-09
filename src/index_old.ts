import 'reflect-metadata';
import { createConnection, EntityManager } from 'typeorm';
// import { Catalog} from './entity/User';
import { Catalog } from './entity/Catalog';
import { serialize } from 'class-transformer';
import { Server } from 'http';

createConnection()
  .then(async (connection) => {
    //console.log('Inserting a new user into the database...');

    let catalog = new Catalog();
    catalog.journal = 'My Blog Magazine';
    catalog.publisher = " Kareem's Publishing";
    catalog.edition = 'April 2020';
    catalog.title = 'Starting with TypeScript';
    catalog.author = 'Kareem Olayinka';
    catalog.isPublished = true;

    // await connection.manager.save(catalog);
    // console.log('Saved a new user with id: ' + catalog.id);

    let catalog2 = new Catalog();
    catalog2.journal = 'My Engine Magazine';
    catalog2.publisher = " usman's Publishing";
    catalog2.edition = 'March 2020';
    catalog2.title = 'Starting with Node';
    catalog2.author = 'Usmano';
    catalog2.isPublished = false;

    // khareem234@# - pass

    // await connection.manager.save(catalog2);
    let catalogRepository = connection.getRepository(Catalog);
    // await catalogRepository.save(catalog2);
    // console.log('Saved a new user with id: ' + catalog2.id);

    // Fetch Data

    let [all_Catalogs, catalogCount] = await catalogRepository.findAndCount();
    let allCatalogs2 = await catalogRepository.find({
      select: ['title', 'author'],
    });

    let singleCatalog = await catalogRepository.findOne(1);
    console.log(
      'Single Catalog with Id= 1  : ',
      serialize(singleCatalog) + '\n'
    );

    let specificTitleCatalog = await catalogRepository.findOne({
      title: 'Starting with TypeScript',
    });

    console.log(
      "'Catalog with title : Starting with TypeScript' Catalog from the db: ",
      serialize(specificTitleCatalog) + '\n'
    );

    console.log('Catalogs Count :', catalogCount + '\n');
    console.log('All Catalogs from DB : ', serialize(allCatalogs2) + '\n');

    //  console.log("Catalog's author:", all_Catalogs  + '\n');

    // console.log('Loading users from the database...');
    // const users = await connection.manager.find(User);
    // console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));
