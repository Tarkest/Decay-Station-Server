import { getRepository } from "typeorm";
import { InventorySlot } from "../../../database/models/inventory";
import ItemDataService from "../itemData";
import { Carriage } from "../../../database/models/carriage";
import { CrewMember } from "../../../database/models/crewMember";

export enum InventoryHolder {
  Carriage = "carrigeId",
  CrewMember = "crewMemberId"
}

export default class InventoryService {

  // Repositories

  private dataRepository = getRepository(InventorySlot);

  // Services

  private itemDataService = new ItemDataService();

  public async getInventoryData(holderId: number, holderType: InventoryHolder) {
    return this.dataRepository.find({
      where: {
        [holderType]: holderId
      },
      relations: [
        "item"
      ]
    });
  }

  public async createCarriageSlots(carriageData: Carriage): Promise<boolean> {

    for (let slotIndex = 0; slotIndex < carriageData.data.storageCapacity; slotIndex++) {
      await this.dataRepository.save({ carrige: carriageData });
    }

    return true;
  }

  public async createCrewMemberSlots(crewMemberData: CrewMember): Promise<boolean> {

    for (let equipmentSlotIndex = 0; equipmentSlotIndex < 4; equipmentSlotIndex++) {
      await this.dataRepository.save({ crewMemberEquipment: crewMemberData });
    }

    for (let slotIndex = 0; slotIndex < 30; slotIndex++) {
      await this.dataRepository.save({ crewMember: crewMemberData });
    }

    return true;
  }

  public async addItem(slotId: number, itemId: number, count: number) {

    const item = await this.itemDataService.getItemById(itemId);

    if (!item) throw Error("Invalid item id");

    if (item.maxCount > count) count = item.maxCount;

    return this.dataRepository.save({ id: slotId, item, count });
  }

  public async moveItem(senderSlotId: number, recieverSlotId: number): Promise<InventorySlot> {

    if (senderSlotId === recieverSlotId) throw Error("Can not move item to same slot");

    const senderSlot = await this.dataRepository.findOne({
      where: {
        id: senderSlotId
      },
      relations: [
        "item"
      ]
    });

    if (!senderSlot) throw Error("Invalid sender slot id");

    if (!senderSlot.item) throw Error("There is no item for move");

    const recieverSlot = await this.dataRepository.findOne({
      where: {
        id: recieverSlotId
      },
      relations: [
        "item"
      ]
    });

    if (!recieverSlot) throw Error("Invalid reciever slot id");

    if (!recieverSlot.item) {

      return this.moveSlot(senderSlot, recieverSlot);

    } else if(senderSlot.item.id === recieverSlot.item?.id) {

      return this.concatSlots(senderSlot, recieverSlot);

    } else if (senderSlot.item.id !== recieverSlot.item?.id) {

      return this.swapSlot(senderSlot, recieverSlot);

    }
  }

  private async moveSlot(senderSlot: InventorySlot, recieverSlot: InventorySlot): Promise<InventorySlot> {
    await this.dataRepository.save({
      ...recieverSlot,
      item: senderSlot.item,
      count: senderSlot.count
    });

    return this.dataRepository.save({
      ...senderSlot,
      item: null,
      count: 0
    });
  }

  private async concatSlots(senderSlot: InventorySlot, recieverSlot: InventorySlot): Promise<InventorySlot> {
    const countSum = senderSlot.count + recieverSlot.count
    const fit = countSum < senderSlot.item.maxCount;

    await this.dataRepository.save({
      ...recieverSlot,
      item: senderSlot.item,
      count: fit ? countSum : senderSlot.item.maxCount
    });

    return this.dataRepository.save({
      ...senderSlot,
      item: fit ? null : senderSlot.item,
      count: fit ? 0 : countSum - senderSlot.item.maxCount
    });
  }

  private async swapSlot(senderSlot: InventorySlot, recieverSlot: InventorySlot): Promise<InventorySlot> {
    await this.dataRepository.save({
      ...recieverSlot,
      item: senderSlot.item,
      count: senderSlot.count
    });

    return this.dataRepository.save({
      ...senderSlot,
      item: recieverSlot.item,
      count: recieverSlot.count
    });
  }
}