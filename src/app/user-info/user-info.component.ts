import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Use AngularFire's Firestore
import { ActivatedRoute } from '@angular/router';
import { UserInfoModel } from './user-info.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'], // Fix typo: styleUrl -> styleUrls
})
export class UserInfoComponent implements OnInit {
  userInfo: UserInfoModel | null = null;
  userId: string | null = null;

  qrCodeData: any;

  // Define the card colors here, similar to your Flutter colors
  cardColors: string[] = [
    '#ADB9BE', // Color(0xffADB9BE)
    '#F25C5B', // Color(0xFFF25C5B)
    '#F9924B', // Color(0xFFF9924B)
    '#F9BF2C', // Color(0xFFF9BF2C)
    '#C7A25E', // Color(0xFFC7A25E)
    '#25DFBB', // Color(0xFF25DFBB)
    '#219DFC', // Color(0xFF219DFC)
    '#3D52F4', // Color(0xFF3D52F4)
    '#A447F2', // Color(0xFFA447F2)
    '#E94FD8', // Color(0xFFE94FD8)
    '#35393B', // Color(0xFF35393B)
  ];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId'); // Captures the userId from the route
    console.log('User ID:', this.userId); // Log the userId to confirm it's being extracted correctly

    if (this.userId) {
      this.firestore
        .collection<UserInfoModel>('usersInfo')
        .doc(this.userId)
        .valueChanges()
        .subscribe((data: UserInfoModel | undefined) => {
          if (data) {
            this.userInfo = data;
            this.qrCodeData = data.qrCodeData;
          } else {
            console.error('No document found with this ID');
          }
        });
    }
  }

  // Get the dynamic color based on the user’s colorIndex
  getUserColor(): string {
    const index = this.userInfo?.colorIndex ?? 0; // Default to 0 if colorIndex is undefined
    return this.cardColors[index] || '#ADB9BE'; // Default color if index is out of range
  }
}
