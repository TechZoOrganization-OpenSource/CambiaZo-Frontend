import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { UsersService } from "../../service/users/users.service";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { MembershipsService } from "../../service/memberships/memberships.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogPaymentSuccessfullyComponent } from "../../components/dialog-payment-successfully/dialog-payment-successfully.component";

@Component({
  selector: 'app-buy-membership',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './buy-membership.component.html',
  styleUrls: ['./buy-membership.component.css']
})
export class BuyMembershipComponent implements OnInit {
  user: any = {};
  membership: any = {};

  constructor(
    private userService: UsersService,
    private membershipsService: MembershipsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
    this.getMembershipFromRoute();
  }

  getUser() {
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe((data) => {
      this.user = data;
    });
  }

  getMembershipFromRoute() {
    const url = this.route.snapshot.url.join('');
    const membershipId = url.split('&')[1];
    if (membershipId) {
      this.getMembership(membershipId);
    }
  }

  getMembership(id: string) {
    this.membershipsService.getMembershipById(id).subscribe((data) => {
      this.membership = data;
    });
  }

  buyMembership() {
    const newMembership = this.membership.id;
    const userId = localStorage.getItem('id');
    if (userId && newMembership) {
      this.userService.changeMembership(this.user, newMembership).subscribe(() => {
        this.userService.changeMembershipDate(userId).subscribe(() => {
          const dialogRef = this.dialog.open(DialogPaymentSuccessfullyComponent, { data: this.membership.name });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigateByUrl('/home').then(() => {
              window.location.reload();
            });
          });
        });
      });
    }
  }
}
