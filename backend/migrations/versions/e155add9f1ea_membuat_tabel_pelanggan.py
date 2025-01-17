"""Membuat tabel Pelanggan

Revision ID: e155add9f1ea
Revises: 2bb4b9c37c92
Create Date: 2025-01-07 02:51:21.615428

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e155add9f1ea'
down_revision = '2bb4b9c37c92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pelanggan',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('nama', sa.String(length=100), nullable=False),
    sa.Column('nomor_telepon', sa.String(length=15), nullable=False),
    sa.Column('alamat', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pelanggan')
    # ### end Alembic commands ###
