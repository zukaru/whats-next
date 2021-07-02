import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ListResult, Reference } from '@angular/fire/storage/interfaces';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(private firebase: FirebaseApp) { }

  files: File[] | undefined;


  imageRef: Reference[] = [];


  images: Image[] = [];



  async addNewMedia(files: File[], docID: string) {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storage = this.firebase.storage();

    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storageRef = storage.ref();

    // Create a child reference
    // var imagesRef = storageRef.child(`images/${docID}/${file.}`);
    // imagesRef now points to 'images/[docID]'

    // Child references can also take paths delimited by '/'
    // var spaceRef = storageRef.child('images/space.jpg');
    // spaceRef now points to "images/space.jpg"
    // imagesRef still points to "images"


    files.forEach((file) => {
      let imagesRef = storageRef.child(`images/${docID}/${file.name}`);

      imagesRef.put(file).then(
        (snapshot) => {
          
        }
      )

    })
    
  }


   async fetchMedia( docID: string ) {

    this.images = [];
    let storage = this.firebase.storage();

    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storageRef = storage.ref().child(`images/${docID}`);



    let result = await storageRef.listAll();
    this.imageRef = result.items;
    console.dir(this.imageRef);
    result.items.forEach( imageRef => this.displayImage(imageRef) )
  }


  async displayImage( imageRef: Reference ) {
    let url: string;
    let image: Image = {fullPath: imageRef.fullPath, url: ''};


    try{
      url = await imageRef.getDownloadURL();
    } catch(err) {
      alert('Something went wrong, please try again.')
    }
    
    image.url = url;
    this.images.push(image);
    console.dir(image)

   
  }


  async deleteMedia( fullPath: string ) {
    let confirmDel = confirm('Are you sure you want to delete this image?')

    if(confirmDel) {
      let storage = this.firebase.storage();

      // Get a reference to the storage service, which is used to create references in your storage bucket
      let storageRef = storage.ref().child(fullPath);
      try {
        storageRef.delete()
      } catch(err) {
        alert('Something went wrong. Please try again.')
      }
      
   
      alert('Image was deleted');
      let index = this.images.findIndex((obj) => obj.fullPath === fullPath);
      this.images.splice(index, 1);
      
    }
  }




}
