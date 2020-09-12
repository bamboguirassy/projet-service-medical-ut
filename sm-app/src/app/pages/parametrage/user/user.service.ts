import {Injectable} from '@angular/core';
import {User} from './user';
import {ToastrService} from 'ngx-toastr';
import { BamboAbstractService } from '../../../shared/services/bambo-abstract.service';
import { BamboHttpService } from '../../../shared/services/bambo-http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BamboAbstractService {

    constructor(public httpSrv: BamboHttpService, public toastr: ToastrService) {
        super(httpSrv, toastr);
        this.routePrefix = 'user/';
        this.resourceName = 'USER';
    }

    findByEmail(email: string) {
        return this.httpSrv.get(this.getRoutePrefix() + 'public/email/' + email);
    }

    changePassword(id: any, newPassword: string) {
        return this.httpSrv.post('public/change-password/' + id, newPassword);
    }

    verificateToken(token: string) {
        return this.httpSrv.post('public/verificate-token/', token);
    }

    askResetPassword(email: string) {
        return this.httpSrv.post('public/ask-reset-password/', email);
    }

    checkCurrentPassword(currentPassword) {
        return this.httpSrv.post(this.getRoutePrefix() + 'password_check', {currentPassword}).toPromise();
    }

    updatePassword(passwordModel: {oldPassword:string,newPassword: string, confirmPassword: string}) {
        return this.httpSrv.put(this.getRoutePrefix() + 'password_update', passwordModel);
    }

    uploadProfilPhoto(photo: any, fileName: any) {
        return this.httpSrv.put(this.getRoutePrefix() + 'change_image_profil', {photo, fileName});
    }
    
}