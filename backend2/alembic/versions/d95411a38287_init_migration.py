"""init migration

Revision ID: d95411a38287
Revises: 
Create Date: 2024-06-23 14:54:23.900724

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'd95411a38287'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('password', sa.String(), nullable=True),
        sa.Column('username', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
    )

    # Create invoices table
    op.create_table(
        'invoices',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('grocery_store_id', sa.Integer(), nullable=True),
        sa.Column('last_edited_date', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now(),
                  nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['grocery_store_id'], ['grocery_stores.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )

    # Create items table
    op.create_table(
        'items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('invoice_id', sa.Integer(), nullable=True),
        sa.Column('product_id', sa.Integer(), nullable=True),
        sa.Column('quantity', sa.Integer(), nullable=True),
        sa.Column('total_price', sa.Integer(), nullable=True),
        sa.Column('unit_price', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['invoice_id'], ['invoices.id'], ),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )

    # Create products table
    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('reference', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=True),
        sa.Column('category_id', sa.Integer(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('reference'),
    )

    # Create grocery_stores table
    op.create_table(
        'grocery_stores',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )

    # Create categories table
    op.create_table(
        'categories',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('categories')
    op.drop_table('grocery_stores')
    op.drop_table('products')
    op.drop_table('items')
    op.drop_table('invoices')
    op.drop_table('users')
