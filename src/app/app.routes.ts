import { Routes } from '@angular/router';
import { HomeComponent } from "./content/pages/home/home.component";
import { DonationsComponent } from "./content/pages/donations/donations.component";
import { PostComponent } from "./content/pages/post/post.component";
import { MembershipsComponent } from "./content/pages/memberships/memberships.component";
import { TermsOfUseComponent } from "./content/pages/terms-of-use/terms-of-use.component";
import { PrivacyPolicyComponent } from "./content/pages/privacy-policy/privacy-policy.component";
import { LoginComponent } from "./content/pages/login/login.component";
import { RegisterComponent } from "./content/pages/register/register.component";
import { ContactComponent } from "./content/pages/contact/contact.component";
import { AssistComponent } from "./content/pages/assist/assist.component";
import { HomeAdminComponent } from "./admin/pages/home-admin/home-admin.component";
import { OngsCategoriesAdminComponent } from "./admin/pages/ongs-categories-admin/ongs-categories-admin.component";
import { OngsAdminComponent } from "./admin/pages/ongs-admin/ongs-admin.component";
import { ProductsCategoriesAdminComponent } from "./admin/pages/products-categories-admin/products-categories-admin.component";
import { ProductsAdminComponent } from "./admin/pages/products-admin/products-admin.component";
import { MembershipsAdminComponent } from "./admin/pages/memberships-admin/memberships-admin.component";
import { UsersAdminComponent } from "./admin/pages/users-admin/users-admin.component";
import { OwnProfileComponent } from "./content/pages/own-profile/own-profile.component";
import { OngDetailComponent } from "./content/pages/ong-detail/ong-detail.component";
import { FilterOngsComponent } from "./content/components/filter-ongs/filter-ongs.component";
import { FilterProductsComponent } from "./content/pages/filter-products/filter-products.component";
import { VerifyEmailComponent } from "./content/pages/verify-email/verify-email.component";
import { ChangePasswordComponent } from "./content/pages/change-password/change-password.component";
import { EditProfileComponent } from "./content/pages/edit-profile/edit-profile.component";
import { ProductDetailsComponent } from "./content/pages/product-details/product-details.component";
import { BuyMembershipComponent } from "./content/pages/buy-membership/buy-membership.component";
import { EditPostComponent } from "./content/pages/edit-post/edit-post.component";
import {PublisherProfileDetailsComponent} from "./content/pages/publisher-profile-details/publisher-profile-details.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'home/post', component: PostComponent },
  { path: 'memberships', component: MembershipsComponent },
  { path: 'memberships/:buy-membership', component: BuyMembershipComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: AssistComponent },
  { path: 'profile', component: OwnProfileComponent },
  { path: 'profile/edit', component: EditProfileComponent },
  { path: 'donations/:ong', component: OngDetailComponent },
  { path: 'home/:products', component: FilterProductsComponent },
  { path: 'product-information/:id', component: ProductDetailsComponent },
  { path: 'post/:postId', component: EditPostComponent },
  { path: 'publisher-profile/:id', component: PublisherProfileDetailsComponent },
  /**************   Admin    *********************/
  { path: 'admin', component: HomeAdminComponent },
  { path: 'admin/ongs-categories', component: OngsCategoriesAdminComponent },
  { path: 'admin/ongs', component: OngsAdminComponent },
  { path: 'admin/products-categories', component: ProductsCategoriesAdminComponent },
  { path: 'admin/products', component: ProductsAdminComponent },
  { path: 'admin/memberships', component: MembershipsAdminComponent },
  { path: 'admin/users', component: UsersAdminComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
