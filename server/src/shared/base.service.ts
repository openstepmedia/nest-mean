import * as mongoose from 'mongoose';
import { getModelForClass, types, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AutoMapper, Constructible } from '@nartc/automapper';

/**
 * @see https://github.com/typegoose/typegoose/issues/303
 * Generic Repository
 */
export abstract class BaseService<U extends types.AnyParamConstructor<any>> {
    protected _model: ReturnModelType<U>;
    protected _mapper: AutoMapper;

    constructor(cls: U) {
      this._model = getModelForClass(cls);
    }

    public async create(item: mongoose.CreateQuery<DocumentType<InstanceType<U>>>) {
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

}
