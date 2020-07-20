import * as mongoose from 'mongoose';
import { getModelForClass, prop, types, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
// import { AutoMapper, Constructible } from 'automapper-nartc';
import { AutoMapper, Constructible } from '@nartc/automapper';

// export abstract class BaseService<T extends Typegoose> {
export abstract class BaseService<U extends types.AnyParamConstructor<any>> {
    // protected _model: ModelType<T>;
    protected _model: ReturnModelType<U>;
    protected _mapper: AutoMapper;

    constructor(cls: U) {
      this._model = getModelForClass(cls);
    }

    public create(item: mongoose.CreateQuery<DocumentType<InstanceType<U>>>) {
      return this._model.create(item);
    }

    public async update(id: string, item: mongoose.UpdateQuery<DocumentType<InstanceType<U>>>) {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    }

    public async findOne(filter = {}) {
        return this._model.findOne(filter).exec();
    }

    public async findAll(filter = {}) {
        return this._model.find(filter).exec();
    }

    public async findById(id: string) {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    private toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId(id);
    }

    public async delete(id: string) {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    public async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
        return this._model.deleteMany(filter).exec();
    }
/*
    async create(item: CreateQuery<T>): Promise<DocumentType<T>> {
        return this._model.create(item);
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }


    async update(id: string, item: UpdateQuery<T>): Promise<DocumentType<T>> {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    }

*/

    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    async map<T, K>(
        object: Partial<DocumentType<T>>,
        source: Constructible<T>,
        destination: Constructible<K>,
    ): Promise<K> {
        return this._mapper.map(object as T, destination, source);
    }

    async mapArray<T, K>(
        object: Array<Partial<DocumentType<T>>>,
        source: Constructible<T>,
        destination: Constructible<K>
    ): Promise<K[]> {
        return this._mapper.mapArray(object as T[], destination, source)
    }

/*
    async map<T, K>(
        object: Partial<DocumentType<T>>,
        source: Constructible<T>,
        destination: Constructible<K>,
    ): Promise<K> {
        return this._mapper.map<T, K>(object as T, source, destination);
    }

    async mapArray<T, K>(
        object: Array<Partial<DocumentType<T>>>,
        source: Constructible<T>,
        destination: Constructible<K>
    ): Promise<K[]> {
        return this._mapper.mapArray<T, K>(object as T[], source, destination)
    }

    async findAll(filter = {}): Promise<DocumentType<T>[]> {
        return this._model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<DocumentType<T>> {
        return this._model.findOne(filter).exec();
    }

    async findById(id: string): Promise<DocumentType<T>> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    async delete(id: string): Promise<DocumentType<T>> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
        return this._model.deleteMany(filter).exec();
    }
*/
}
