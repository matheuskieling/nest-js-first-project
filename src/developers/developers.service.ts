import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>
  ) {}
  create(dto: CreateDeveloperDto) {
    const developer = this.repository.create(dto);
    return this.repository.save(developer);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const developer = await this.repository.findOneBy({ id })
    if (!developer) return null
  }

  async update(id: string, dto: UpdateDeveloperDto) {
    // return this.repository.update(id, dto)
    const developer = await this.repository.findOneBy({ id })
    if (!developer) return null;
    this.repository.merge(developer, dto);
    return this.repository.save(developer);
  }

  async remove(id: string) {
    const developer = await this.repository.findOneBy({ id })
    if (!developer) return null;
    return this.repository.remove(developer);
  }
}
