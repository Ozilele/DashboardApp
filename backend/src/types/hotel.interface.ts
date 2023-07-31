export interface Hotel {
    name: string,
    country: string,
    localization?: {
      city: string,
      address: string
    },
    hotelImage: string,
    stars: number,
    image?: {
      name: string,
      img: {
        data: Buffer,
        contentType: string,
      }
    }
    features?: {   
      closeToSee: Boolean,
      closeToMountains: Boolean,
      hasParking: Boolean,
    }
}