import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item, ItemStatus, User } from '@prisma/client';
import { CreateItemDto } from 'src/items/items.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prisma.item.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    return await this.prisma.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
      },
    });
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);

    if (item.userId === user.id) {
      throw new BadRequestException('cannot purchase own products');
    }

    return await this.prisma.item.update({
      where: {
        id,
      },
      data: {
        status: ItemStatus.SOLD_OUT,
      },
    });
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException("cannot purchase other people's goods");
    }
    await this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
