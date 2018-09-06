import { Http, Response, ConnectionBackend, Request, RequestOptionsArgs } from '@angular/http';

import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export class HttpUtils {
    public static extractData(res: Response) {
        let body: any = {};
        try {
            body = res.json();
        } catch (e) {
        }

        return body.data || body || {};
    }

    public static handleError(error: HttpErrorResponse) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            let body: any = '';
            try {
                body = error.json();
            } catch (e) {
                body = error.text || '';
            }
            let err = body.message || body.error || JSON.stringify(body);
            if (!err || err === 'No message available') {
                err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = body.message;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
