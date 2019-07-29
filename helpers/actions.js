export class Actions {
  static addData = (model, data, permit) => model.create(data, { fields: permit })


}