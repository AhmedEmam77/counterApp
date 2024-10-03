import { DocumentSnapshot } from '@angular/fire/compat/firestore'; // Import the correct DocumentSnapshot type

export class FileModel {
  id!: string;
  name!: string;
  type!: string;
  downloadUrl!: string;
  path!: string;

  constructor(init?: Partial<FileModel>) {
    Object.assign(this, init);
  }

  isPdf(): boolean {
    return this.name.endsWith('.pdf');
  }

  isImage(): boolean {
    return (
      this.name.endsWith('.jpg') ||
      this.name.endsWith('.jpeg') ||
      this.name.endsWith('.png')
    );
  }
}

export class AdditionalDataModel {
  id!: string;
  type!: string; // Adjust as per your enum structure
  imageName!: string;
  text!: string;
  content!: string;
  phoneAddress?: string;

  constructor(init?: Partial<AdditionalDataModel>) {
    Object.assign(this, init);
  }
}

export class UserInfoModel {
  id!: string;
  cardName!: string;
  firstName!: string;
  lastName!: string;
  jobTitle!: string;
  company!: string;
  email!: string;
  mobileNumber!: string;
  colorIndex!: number;
  logoImg?: FileModel;
  personalImg?: FileModel;
  croppedLogoImg?: FileModel;
  croppedPersonalImg?: FileModel;
  qrCodeData?: string;
  additionalData?: AdditionalDataModel[];
  isSaved!: boolean;

  constructor(init?: Partial<UserInfoModel>) {
    Object.assign(this, init);
  }

  static fromJson(json: any): UserInfoModel {
    return new UserInfoModel({
      id: json.id,
      cardName: json.cardName,
      firstName: json.firstName,
      lastName: json.lastName,
      jobTitle: json.jobTitle,
      company: json.company,
      email: json.email,
      mobileNumber: json.mobileNumber,
      colorIndex: json.colorIndex,
      logoImg: json.logoImg ? new FileModel(json.logoImg) : undefined,
      personalImg: json.personalImg
        ? new FileModel(json.personalImg)
        : undefined,
      croppedLogoImg: json.croppedLogoImg
        ? new FileModel(json.croppedLogoImg)
        : undefined,
      croppedPersonalImg: json.croppedPersonalImg
        ? new FileModel(json.croppedPersonalImg)
        : undefined,
      qrCodeData: json.qrCodeData,
      additionalData: json.additionalData
        ? json.additionalData.map((data: any) => new AdditionalDataModel(data))
        : undefined,
      isSaved: json.isSaved,
    });
  }

  static fromSnapshot(
    snapshot: DocumentSnapshot<UserInfoModel>
  ): UserInfoModel {
    const json = snapshot.data(); // Get the data as a map

    return new UserInfoModel({
      id: snapshot.id, // Use the Firestore document ID
      cardName: json?.cardName,
      firstName: json?.firstName,
      lastName: json?.lastName,
      jobTitle: json?.jobTitle,
      company: json?.company,
      email: json?.email,
      mobileNumber: json?.mobileNumber,
      colorIndex: json?.colorIndex,
      logoImg: json?.logoImg ? new FileModel(json.logoImg) : undefined,
      personalImg: json?.personalImg
        ? new FileModel(json.personalImg)
        : undefined,
      croppedLogoImg: json?.croppedLogoImg
        ? new FileModel(json.croppedLogoImg)
        : undefined,
      croppedPersonalImg: json?.croppedPersonalImg
        ? new FileModel(json.croppedPersonalImg)
        : undefined,
      qrCodeData: json?.qrCodeData,
      additionalData: json?.additionalData
        ? json.additionalData.map((data: any) => new AdditionalDataModel(data))
        : undefined,
      isSaved: json?.isSaved,
    });
  }
}
