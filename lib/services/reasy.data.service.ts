import { ReasyTs } from '../';
import * as ng from 'angular';

export class ReasyDataItem<T> implements ReasyTs.IDataItem<ng.IPromise<T>> {
    get(): ng.IPromise<T> {
        return;
    }

    post(): ng.IPromise<T> {
        return;
    }

    put(): ng.IPromise<T> {
        return;
    }

    patch(): ng.IPromise<T> {
        return;
    }

    delete(): ng.IPromise<T> {
        return;
    }
}

export class ReasyDataCollection<T> implements ReasyTs.IDataCollection<ng.IPromise<Array<T>>> {
    get(): ng.IPromise<Array<T>> {
        return;
    }

    post(): ng.IPromise<Array<T>> {
        return;
    }

    put(): ng.IPromise<Array<T>> {
        return;
    }

    patch(): ng.IPromise<Array<T>> {
        return;
    }

    delete(): ng.IPromise<Array<T>> {
        return;
    }
}